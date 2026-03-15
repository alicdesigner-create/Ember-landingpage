// ─────────────────────────────────────────
//  EMBER BUSINESS SERVICES – Share Button
// ─────────────────────────────────────────

document.getElementById('shareBtn').addEventListener('click', function () {
  const tooltip = document.getElementById('shareTooltip');

  if (navigator.share) {
    navigator.share({
      title: 'Ember Business Services',
      text: 'Dulce Dorado - Business Service Consultant',
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href).then(function () {
      tooltip.classList.add('visible');
      setTimeout(function () { tooltip.classList.remove('visible'); }, 2000);
    });
  }
});

// ─────────────────────────────────────────
//  EMBER BUSINESS SERVICES – Save Contact (vCard 3.0)
// ─────────────────────────────────────────

document.getElementById('saveContact').addEventListener('click', function () {

  // vCard 3.0 — RFC 2426 — CRLF line endings required
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Dulce Dorado',
    'N:Dorado;Dulce;;;',
    'ORG:Ember Business Services',
    'TITLE:Business Service Consultant',
    'TEL;TYPE=WORK,VOICE:720-948-6244',
    'EMAIL;TYPE=INTERNET:dulce@emberbservices.com',
    'URL:https://emberbservices.com',
    'END:VCARD',
    ''          // trailing CRLF required by spec
  ];

  const vcard = lines.join('\r\n');
  const filename = 'Dulce-Dorado-Ember.vcf';

  // iOS Safari does not honour the `download` attribute on blob URLs.
  // Opening the URL directly lets iOS intercept the text/vcard MIME type
  // and show its native "Add to Contacts" sheet.
  const isIOS = /iP(hone|ad|od)/i.test(navigator.userAgent);

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url  = URL.createObjectURL(blob);

  if (isIOS) {
    window.location.href = url;
  } else {
    const link = document.createElement('a');
    link.href     = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
});
