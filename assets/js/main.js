/**
 * 个人作品集网站主脚本
 * 作者: 朵朵
 * 创建日期: 2024-05-31
 */

document.addEventListener('DOMContentLoaded', function() {
    // 更新版权年份
    updateCopyrightYear();
    
    // 设置平滑滚动
    setupSmoothScrolling();
    
    // 添加图片加载延迟
    setupLazyLoading();
    
    // 设置视频播放
    setupVideos();
    
    // 添加移动设备菜单功能
    setupMobileMenu();
});

/**
 * 更新页脚版权年份为当前年份
 */
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * 设置网站内锚点链接的平滑滚动效果
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 更新URL，但不跳转
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * 设置图片延迟加载
 */
function setupLazyLoading() {
    // 检查浏览器是否支持 Intersection Observer API
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // 对于不支持 Intersection Observer 的浏览器，立即加载所有图片
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.classList.remove('lazy-image');
        });
    }
}

/**
 * 设置项目视频播放
 */
function setupVideos() {
    const videoContainers = document.querySelectorAll('.vertical-screen-placeholder');
    
    videoContainers.forEach(function(container) {
        const video = container.querySelector('.vertical-screen-video');
        const overlay = container.querySelector('.video-overlay');
        const playButton = container.querySelector('.video-play-button');
        
        if (!video || !overlay || !playButton) return;
        
        // 点击播放按钮播放视频
        playButton.addEventListener('click', function() {
            // 尝试播放视频
            video.play().then(function() {
                // 播放成功，隐藏覆盖层
                overlay.classList.add('playing');
            }).catch(function(error) {
                console.log('播放被阻止:', error);
            });
        });
        
        // 点击视频时暂停/播放
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play().then(function() {
                    overlay.classList.add('playing');
                }).catch(function(error) {
                    console.log('播放被阻止:', error);
                });
            } else {
                video.pause();
                overlay.classList.remove('playing');
            }
        });
        
        // 视频播放结束时显示覆盖层
        video.addEventListener('ended', function() {
            overlay.classList.remove('playing');
            // 循环播放
            video.play().catch(function(error) {
                console.log('自动重播被阻止:', error);
            });
        });
        
        // 使用 Intersection Observer 实现视频进入视口时自动播放
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    // 视频进入视口
                    if (entry.isIntersecting) {
                        // 尝试自动播放视频（静音状态下）
                        video.play().then(function() {
                            overlay.classList.add('playing');
                        }).catch(function(error) {
                            console.log('自动播放被阻止:', error);
                        });
                    } else {
                        // 视频离开视口时暂停播放
                        video.pause();
                        overlay.classList.remove('playing');
                    }
                });
            }, { threshold: 0.5 }); // 当50%的视频可见时触发
            
            videoObserver.observe(container);
        }
        
        // 双击视频切换全屏
        video.addEventListener('dblclick', function() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                container.requestFullscreen().catch(function(error) {
                    console.log('全屏请求被拒绝:', error);
                });
            }
        });
    });
}

/**
 * 设置移动设备菜单
 */
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // 点击菜单项后自动关闭菜单
        const menuItems = mobileMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

/**
 * 为项目详情页添加特定功能
 */
if (document.querySelector('.project-story')) {
    // 给图片添加点击放大功能
    document.querySelectorAll('.story-content img').forEach(img => {
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';
            
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', function() {
                this.remove();
            });
        });
    });
    
    // 给代码块添加语法高亮(如果页面包含代码块)
    if (document.querySelector('pre code')) {
        const highlightScript = document.createElement('script');
        highlightScript.src = 'https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/lib/highlight.min.js';
        document.head.appendChild(highlightScript);
        
        const highlightCSS = document.createElement('link');
        highlightCSS.rel = 'stylesheet';
        highlightCSS.href = 'https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/github.min.css';
        document.head.appendChild(highlightCSS);
        
        highlightScript.onload = function() {
            document.querySelectorAll('pre code').forEach(block => {
                hljs.highlightBlock(block);
            });
        };
    }
}

// 返回顶部按钮
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// 作品分类标签切换
const tabs = document.querySelectorAll('.tab');
const workCards = document.querySelectorAll('.work-card');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有标签的active类
        tabs.forEach(t => t.classList.remove('active'));
        // 为当前点击的标签添加active类
        tab.classList.add('active');
        
        // 获取选中的分类
        const category = tab.textContent.toLowerCase();
        
        // 筛选作品卡片
        workCards.forEach(card => {
            const cardCategory = card.querySelector('.work-category').textContent.toLowerCase();
            if (category === '全部' || cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 搜索功能
const searchInput = document.querySelector('.nav-search input');
const searchIcon = document.querySelector('.nav-search i');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // 搜索作品
    workCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const techStack = Array.from(card.querySelectorAll('.tech-tag'))
            .map(tag => tag.textContent.toLowerCase());
        
        if (title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            techStack.some(tech => tech.includes(searchTerm))) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // 搜索文章
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const category = card.querySelector('.article-category').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            category.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// 表单提交处理
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // 这里可以添加表单验证逻辑
    
    // 模拟表单提交
    alert('感谢您的留言！我们会尽快回复。');
    contactForm.reset();
});

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
}); 