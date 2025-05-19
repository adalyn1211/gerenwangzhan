/**
 * 链接有效性检查脚本
 * 用于检查网站中的链接和文件一致性
 * 
 * 使用方法：在浏览器控制台中运行该脚本
 */

(function() {
  console.log('开始检查网站链接...');

  // 获取所有链接
  const links = document.querySelectorAll('a');
  const brokenLinks = [];
  const externalLinks = [];
  const internalLinks = [];

  // 检查每个链接
  links.forEach(link => {
    const href = link.getAttribute('href');
    
    // 跳过空链接或锚点链接
    if (!href || href === '#') {
      return;
    }
    
    // 检查是否为外部链接
    if (href.startsWith('http') || href.startsWith('https')) {
      externalLinks.push({
        text: link.textContent.trim(),
        href: href
      });
      return;
    }
    
    // 检查内部链接
    if (href.startsWith('#')) {
      // 检查锚点是否存在
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (!targetElement) {
        brokenLinks.push({
          text: link.textContent.trim(),
          href: href,
          reason: `锚点 ${targetId} 不存在`
        });
      } else {
        internalLinks.push({
          text: link.textContent.trim(),
          href: href,
          type: '锚点链接'
        });
      }
    } else {
      // 相对或绝对路径链接
      internalLinks.push({
        text: link.textContent.trim(),
        href: href,
        type: '文件链接'
      });
      
      // 注意：浏览器环境中无法直接检查文件是否存在
      // 这里仅做记录，实际检查需要在服务器端进行
    }
  });

  // 输出检查结果
  console.log('检查完成!');
  console.log(`总链接数: ${links.length}`);
  console.log(`内部链接: ${internalLinks.length}`);
  console.log(`外部链接: ${externalLinks.length}`);
  console.log(`可能的问题链接: ${brokenLinks.length}`);
  
  if (brokenLinks.length > 0) {
    console.log('问题链接列表:');
    console.table(brokenLinks);
  }
  
  console.log('内部链接列表:');
  console.table(internalLinks);
  
  console.log('外部链接列表:');
  console.table(externalLinks);
  
  return {
    allLinks: links.length,
    internalLinks: internalLinks,
    externalLinks: externalLinks,
    brokenLinks: brokenLinks
  };
})(); 