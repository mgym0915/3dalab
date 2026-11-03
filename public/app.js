(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const ui = Object.fromEntries(['entry','keyForm','keyInput','keyField','keyStatus','enterButton','hotspots','roomHeader','switchSpace','spaceIntro','spaceTitle','mobileDock','featureDialog','dialogTitle','dialogContent','closeDialog','toast'].map(id => [id, $(id)]));
  let currentSpace = null, busy = false, autoTimer, previewTimer, boardTimer, toastTimer;
  const cards = [...document.querySelectorAll('.hotspot')];
  const names = { board: '希沃留言板', games: '棋牌室', tools: '3D 打印工具' };
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  async function api(url, options = {}) {
    const response = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } });
    let data;
    try { data = await response.json(); } catch { throw new Error('连接暂时中断，请稍后再试'); }
    if (!response.ok) {
      if (response.status === 401 && currentSpace) { resetEntry(); toast('登录已过期，请重新输入密钥'); }
      throw new Error(data.error || '请求未完成，请重试');
    }
    return data;
  }
  function toast(message) {
    clearTimeout(toastTimer); ui.toast.textContent = message; ui.toast.classList.add('visible');
    toastTimer = setTimeout(() => ui.toast.classList.remove('visible'), 3500);
  }
  function updatePreview() {
    clearTimeout(previewTimer);
    const key = ui.keyInput.value;
    const is3d = /[a-z]/i.test(key);
    const ratio = Math.min(key.length / (is3d ? 6 : 9), 1);
    const farthestCorner = Math.hypot(innerWidth / 2, innerHeight * .54) * 1.06;
    document.documentElement.style.setProperty('--radius', `${ratio * farthestCorner}px`);
    document.body.classList.toggle('space-3d', is3d);
    document.body.classList.toggle('preview', ratio > 0);
    document.documentElement.style.setProperty('--preview-opacity', String(Math.max(0, (ratio - .5) * 1.35)));
    cards.forEach(card => { card.hidden = (card.dataset.panel === 'tools') !== is3d; });
    ui.keyStatus.classList.remove('error');
    ui.keyStatus.textContent = '';
    clearTimeout(autoTimer);
    if ((is3d && key.length === 6) || (!is3d && key.length === 9)) autoTimer = setTimeout(() => login(), 550);
  }
  async function login() {
    if (busy || !ui.keyInput.value || currentSpace) return;
    clearTimeout(autoTimer); busy = true;
    document.body.classList.add('loading'); ui.enterButton.disabled = true;
    try {
      const result = await api('/api/login', { method: 'POST', body: JSON.stringify({ key: ui.keyInput.value }) });
      openSpace(result.space);
    } catch (error) {
      ui.keyStatus.textContent = error.message; ui.keyStatus.classList.add('error');
      document.documentElement.style.setProperty('--radius', '0px');
      document.body.classList.remove('preview');
      previewTimer = setTimeout(() => { if (!currentSpace) ui.keyInput.focus(); }, 400);
    } finally { busy = false; document.body.classList.remove('loading'); ui.enterButton.disabled = false; }
  }
  function openSpace(space) {
    currentSpace = space;
    const is3d = space === '3d';
    document.body.classList.toggle('space-3d', is3d);
    document.body.classList.remove('preview');
    document.body.classList.add('space-open');
    document.documentElement.style.setProperty('--radius', `${Math.hypot(innerWidth, innerHeight)}px`);
    ui.entry.setAttribute('inert', '');
    ui.hotspots.removeAttribute('inert');
    ui.roomHeader.hidden = false; ui.spaceIntro.hidden = false; ui.mobileDock.hidden = false;
    ui.spaceTitle.textContent = is3d ? '3D 实验室' : '118 实验室';
    cards.forEach(card => { card.hidden = (card.dataset.panel === 'tools') !== is3d; });
    ui.mobileDock.innerHTML = cards.filter(card => !card.hidden).map(card => `<button data-panel="${card.dataset.panel}">${names[card.dataset.panel]}<span>↗</span></button>`).join('');
    document.title = `${is3d ? '3D 实验室' : '118 实验室'} · 3DAlab`;
    ui.keyInput.value = '';
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }
  function resetEntry() {
    currentSpace = null; clearTimeout(autoTimer); clearTimeout(previewTimer); clearInterval(boardTimer);
    if (ui.featureDialog.open) ui.featureDialog.close();
    document.body.classList.remove('space-open','space-3d','preview');
    document.documentElement.style.setProperty('--radius', '0px');
    ui.entry.removeAttribute('inert'); ui.hotspots.setAttribute('inert', '');
    ui.roomHeader.hidden = true; ui.spaceIntro.hidden = true; ui.mobileDock.hidden = true;
    ui.keyInput.value = ''; ui.keyInput.type = 'password';
    ui.keyStatus.classList.remove('error'); ui.keyStatus.textContent = '';
    document.title = '3DAlab';
  }
  function openPanel(panel) {
    if (!currentSpace || (currentSpace === '3d' ? panel !== 'tools' : panel === 'tools')) return;
    clearInterval(boardTimer);
    ui.dialogTitle.textContent = names[panel];
    ui.dialogContent.replaceChildren();
    if (panel === 'board') {
      let savedName = ''; try { savedName = localStorage.getItem('lab_nickname') || ''; } catch {}
      ui.dialogContent.innerHTML = `<form class="message-form" id="messageForm"><input name="author" placeholder="昵称" maxlength="24" aria-label="你的昵称" value="${escape(savedName)}" required><textarea name="body" placeholder="留言内容" maxlength="500" aria-label="留言内容" required></textarea><div class="form-bottom"><span class="char-count" id="charCount">0 / 500</span><button type="submit" class="primary-button">发布</button></div></form><div class="messages-heading"><span id="messageCount">留言板</span><button class="refresh-button" id="refreshMessages">刷新 ↻</button></div><div id="messagesList" class="messages-list" aria-live="polite"><div class="empty-board">加载中…</div></div>`;
      const form = $('messageForm');
      form.elements.body.addEventListener('input', () => $('charCount').textContent = `${form.elements.body.value.length} / 500`);
      form.addEventListener('submit', async event => {
        event.preventDefault(); const button = form.querySelector('button'); button.disabled = true;
        try {
          await api('/api/messages', { method: 'POST', body: JSON.stringify({ author: form.elements.author.value, body: form.elements.body.value }) });
          try { localStorage.setItem('lab_nickname', form.elements.author.value); } catch {}
          form.elements.body.value = ''; $('charCount').textContent = '0 / 500';
          await loadMessages(); toast('已发布');
        } catch (error) { toast(error.message); } finally { button.disabled = false; }
      });
      $('refreshMessages').addEventListener('click', () => loadMessages());
      loadMessages();
      boardTimer = setInterval(() => { if (!document.hidden) loadMessages(true); }, 10000);
    } else {
      const isTools = panel === 'tools';
      ui.dialogContent.innerHTML = `<div class="empty-panel"><p>${isTools ? '工具待添加' : '游戏待添加'}</p></div>`;
    }
    ui.featureDialog.showModal();
  }
  async function loadMessages(silent = false) {
    if (!$('messagesList')) return;
    try {
      const { messages } = await api('/api/messages');
      if (!$('messagesList')) return;
      $('messageCount').textContent = messages.length ? `${messages.length} 条留言${messages.length === 200 ? ' · 最近 200 条' : ''}` : '暂无留言';
      $('messagesList').innerHTML = messages.length ? messages.map(message => `<article class="message"><p>${escape(message.body)}</p><div class="message-meta"><strong>${escape(message.author)}</strong><time datetime="${new Date(message.created).toISOString()}">${new Date(message.created).toLocaleString('zh-CN', { month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit' })}</time></div>${message.mine ? `<button class="delete-button" data-delete="${escape(message.id)}">删除</button>` : ''}</article>`).join('') : '<div class="empty-board">暂无留言</div>';
    } catch (error) {
      if (!silent && $('messagesList')) $('messagesList').innerHTML = `<div class="empty-board">${escape(error.message)}<br>点击“刷新”重试。</div>`;
    }
  }
  ui.keyInput.addEventListener('input', updatePreview);
  ui.keyForm.addEventListener('submit', event => { event.preventDefault(); login(); });
  ui.switchSpace.addEventListener('click', async () => {
    ui.switchSpace.disabled = true;
    try { await api('/api/logout', { method: 'POST' }); resetEntry(); }
    catch (error) { toast(error.message); }
    finally { ui.switchSpace.disabled = false; }
  });
  for (const container of [ui.hotspots, ui.mobileDock]) container.addEventListener('click', event => { const button = event.target.closest('[data-panel]'); if (button) openPanel(button.dataset.panel); });
  ui.closeDialog.addEventListener('click', () => ui.featureDialog.close());
  ui.featureDialog.addEventListener('close', () => clearInterval(boardTimer));
  ui.featureDialog.addEventListener('click', event => {
    if (event.target !== ui.featureDialog) return;
    const rect = ui.featureDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) ui.featureDialog.close();
  });
  ui.dialogContent.addEventListener('click', async event => {
    const button = event.target.closest('[data-delete]'); if (!button) return;
    if (button.dataset.confirm !== 'yes') { button.dataset.confirm = 'yes'; button.textContent = '确定删除？再点一次'; return; }
    button.disabled = true;
    try { await api(`/api/messages/${button.dataset.delete}`, { method:'DELETE' }); await loadMessages(); toast('已删除'); }
    catch (error) { toast(error.message); button.disabled = false; }
  });
  window.addEventListener('resize', () => { if (currentSpace) document.documentElement.style.setProperty('--radius', `${Math.hypot(innerWidth, innerHeight)}px`); else if (ui.keyInput.value) updatePreview(); });
  // 每次打开都先展示白模入口，符合空间入口的设计；会话仅用于当前页面及留言请求。
})();
