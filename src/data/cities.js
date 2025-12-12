// 城市配置数据（基于真实地理坐标转换）
// 真实坐标范围：X: 115-121, Y: 30-39
// 转换为SVG坐标（10-90范围）
export const cities = [
    { name: '北京', x: 27, y: 8, id: 'beijing' },
    { name: '天津', x: 36, y: 17, id: 'tianjin' },
    { name: '聊城', x: 26, y: 36, id: 'liaocheng' },
    { name: '徐州', x: 37, y: 54, id: 'xuzhou' },
    { name: '扬州', x: 51, y: 63, id: 'yangzhou' },
    { name: '苏州', x: 60, y: 75, id: 'suzhou' },
    { name: '杭州', x: 56, y: 91, id: 'hangzhou' },
    { name: '南京', x: 36, y: 67, id: 'nanjing' },
]

export const cityNames = {
    beijing: '北京',
    tianjin: '天津',
    liaocheng: '聊城',
    xuzhou: '徐州',
    yangzhou: '扬州',
    suzhou: '苏州',
    hangzhou: '杭州',
    nanjing: '南京',
}

