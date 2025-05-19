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

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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