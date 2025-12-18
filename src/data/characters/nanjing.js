// 南京人物数据（使用真实人物图片）
// 图片位于 public/character/nanjing 目录下：
// 正面：林文绮.jpg、苏岫云.jpg、王淮远.jpg、赵秉丰.jpg、郑潮生.jpg
// 封底：封底-林.jpg、封底-苏.jpg、封底-王.jpg、封底-赵.jpg、封底-郑.jpg

const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/'
const publicPath = base.endsWith('/') ? base : `${base}/`

export const nanjingCharacters = {
    title: '循舟纪之南京 · 渡客长卷',
    city: '南京',
    characters: [
        {
            id: 1,
            name: '林文绮',
            role: '渡客',
            imageFront: `${publicPath}character/nanjing/林文绮.jpg`,
            imageBack: `${publicPath}character/nanjing/封底-林.jpg`,
            description: '自江南而来的林文绮，携卷踏舟，沿运河南下，记录风土人情。',
            relationships: [2, 3]
        },
        {
            id: 2,
            name: '苏岫云',
            role: '渡客',
            imageFront: `${publicPath}character/nanjing/苏岫云.jpg`,
            imageBack: `${publicPath}character/nanjing/封底-苏.jpg`,
            description: '苏岫云善记行旅，所至之处皆留素描与札记，为长卷添上灵动一笔。',
            relationships: [1, 4]
        },
        {
            id: 3,
            name: '王淮远',
            role: '渡客',
            imageFront: `${publicPath}character/nanjing/王淮远.jpg`,
            imageBack: `${publicPath}character/nanjing/封底-王.jpg`,
            description: '王淮远熟悉河道水势，常为同伴指点江流与城郭的前世今生。',
            relationships: [1, 5]
        },
        {
            id: 4,
            name: '赵秉丰',
            role: '渡客',
            imageFront: `${publicPath}character/nanjing/赵秉丰.jpg`,
            imageBack: `${publicPath}character/nanjing/封底-赵.jpg`,
            description: '赵秉丰擅于访谈舟楫之间的匠人与行商，将口述故事编入长卷。',
            relationships: [2, 5]
        },
        {
            id: 5,
            name: '郑潮生',
            role: '渡客',
            imageFront: `${publicPath}character/nanjing/郑潮生.jpg`,
            imageBack: `${publicPath}character/nanjing/封底-郑.jpg`,
            description: '郑潮生关注运河沿岸城镇的今昔变迁，以镜头捕捉时代波澜。',
            relationships: [3, 4]
        }
    ]
}

