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
    ,
    // 南京关系网络（更细的“边”数据：摘要 + 详情）
    // nodes 里允许出现仅用于关系展示的“额外人物”（如林文瑾/林武、苏班主）
    network: {
        nodes: [
            // 五位渡客（可点击打开人物弹窗）
            { id: 'linwenqi', name: '林文绮', characterId: 1, left: 16, top: 30 },
            { id: 'suxiuyun', name: '苏岫云', characterId: 2, left: 52, top: 14 },
            { id: 'wanghuaiyuan', name: '王淮远', characterId: 3, left: 84, top: 40 },
            { id: 'zhaobingfeng', name: '赵秉丰', characterId: 4, left: 36, top: 82 },
            { id: 'zhengchaosheng', name: '郑潮生', characterId: 5, left: 84, top: 78 },

            // 额外人物（仅作关系标识）
            { id: 'linwenjin', name: '林文瑾（林武）', role: '林文绮之兄', left: 18, top: 62 },
            { id: 'subanzhu', name: '苏班主', role: '苏岫云名义父亲', left: 52, top: 42 },
        ],
        edges: [
            {
                from: 'suxiuyun',
                to: 'zhaobingfeng',
                summary: '养父女',
                detail: '苏岫云是赵秉丰的养女。',
                via: [{ x: 52, y: 28 }, { x: 42, y: 42 }],
                color: '#6e5a3d'
            },
            {
                from: 'wanghuaiyuan',
                to: 'zhengchaosheng',
                summary: '兄弟',
                detail: '王淮远是郑潮生的哥哥。',
                via: [{ x: 90, y: 50 }],
                color: '#3f6f72'
            },
            {
                from: 'zhengchaosheng',
                to: 'suxiuyun',
                summary: '恋慕',
                detail: '郑潮生是苏岫云心爱的男子。',
                via: [{ x: 92, y: 22 }],
                color: '#6a5a8f'
            },
            {
                from: 'linwenqi',
                to: 'linwenjin',
                summary: '兄妹',
                detail: '林文绮的哥哥是林文瑾。',
                via: [{ x: 10, y: 40 }],
                color: '#6b5a42'
            },
            {
                from: 'linwenjin',
                to: 'wanghuaiyuan',
                summary: '同船旧识',
                detail: '林文瑾与王淮远曾同在一条船上；当时林文瑾化名“林武”。',
                via: [{ x: 20, y: 84 }, { x: 72, y: 86 }],
                color: '#4f6a4f'
            },
            {
                from: 'linwenjin',
                to: 'suxiuyun',
                summary: '潜入盗图',
                detail: '林文瑾曾秘密潜入苏岫云家中盗走密图，苏班主被此事气死。',
                via: [{ x: 18, y: 10 }],
                color: '#7a4f58'
            },
            {
                from: 'linwenjin',
                to: 'subanzhu',
                summary: '牵连',
                detail: '密图被盗一事牵连苏班主，最终使其被气死。',
                // 分支：从“潜入盗图”(林文瑾→苏岫云)这条线的中间分出，再连到苏班主
                fromAnchor: { type: 'edgeMid', edgeFrom: 'linwenjin', edgeTo: 'suxiuyun', t: 0.5 },
                hideLabel: true,
                color: '#7a4f58'
            },
            {
                from: 'subanzhu',
                to: 'suxiuyun',
                summary: '名义父女',
                detail: '苏岫云名义上的父亲为苏班主；因密图被盗一事被气死。',
                via: [{ x: 46, y: 30 }],
                color: '#5a6b7a'
            },
            {
                from: 'subanzhu',
                to: 'zhaobingfeng',
                summary: '威胁',
                detail: '苏班主曾威胁过赵秉丰。',
                via: [{ x: 58, y: 56 }],
                color: '#7a6a52'
            },
            {
                from: 'wanghuaiyuan',
                to: 'zhaobingfeng',
                summary: '借船收粮',
                detail: '王淮远曾到赵秉丰家借船收粮。',
                via: [{ x: 72, y: 48 }],
                color: '#55705a'
            }
        ]
    }
}

