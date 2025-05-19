/**
 * 小程序二维码显示控制
 * 点击"体验产品"按钮后显示对应的二维码
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有带有qrcode-toggle类的链接
    const qrcodeToggles = document.querySelectorAll('.qrcode-toggle');
    let activeQrcode = null; // 记录当前激活的二维码
    
    // 为每个链接添加点击事件
    qrcodeToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // 阻止默认的链接跳转行为
            e.preventDefault();
            e.stopPropagation(); // 阻止事件冒泡
            
            // 获取关联的二维码容器ID
            const qrcodeId = this.getAttribute('data-qrcode');
            const qrcodeContainer = document.getElementById(qrcodeId);
            
            // 如果二维码容器存在
            if (qrcodeContainer) {
                // 如果点击的是当前激活的二维码按钮
                if (activeQrcode === qrcodeContainer) {
                    // 隐藏当前二维码
                    qrcodeContainer.style.display = 'none';
                    activeQrcode = null;
                    return;
                }
                
                // 隐藏所有二维码
                document.querySelectorAll('.qrcode-container').forEach(container => {
                    container.style.display = 'none';
                });
                
                // 显示当前二维码
                qrcodeContainer.style.display = 'block';
                activeQrcode = qrcodeContainer;
                
                // 添加动画效果
                qrcodeContainer.classList.add('fade-in');
                setTimeout(() => {
                    qrcodeContainer.classList.remove('fade-in');
                }, 500);
            }
        });
    });
    
    // 点击二维码内部不应该隐藏二维码
    document.querySelectorAll('.qrcode-container').forEach(container => {
        container.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
        });
    });
    
    // 点击页面其他地方隐藏所有二维码
    document.addEventListener('click', function() {
        if (activeQrcode) {
            activeQrcode.style.display = 'none';
            activeQrcode = null;
        }
    });
});
