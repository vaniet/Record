// 聊城人物数据
export const liaochengCharacters = {
    title: '循舟纪之聊城',
    city: '聊城',
    characters: [
        {
            id: 1,
            name: '光岳楼主',
            role: '文人',
            image: '👨‍🎓',
            description: '光岳楼的管理者，对聊城历史文化有深入了解。',
            relationships: [2, 3]
        },
        {
            id: 2,
            name: '运河船工',
            role: '船夫',
            image: '👨‍🚤',
            description: '在运河上工作多年的船工，熟悉聊城段的航道。',
            relationships: [1, 4]
        },
        {
            id: 3,
            name: '商贾',
            role: '商人',
            image: '👨‍💼',
            description: '往来于聊城与各地的商人，消息灵通。',
            relationships: [1, 5]
        },
        {
            id: 4,
            name: '文士',
            role: '学者',
            image: '👨‍🎓',
            description: '研究聊城历史的学者，了解当地文化。',
            relationships: [2, 5]
        },
        {
            id: 5,
            name: '驿丞',
            role: '官员',
            image: '👨‍💼',
            description: '负责驿站事务的官员，掌握各地往来信息。',
            relationships: [3, 4]
        }
    ]
}

