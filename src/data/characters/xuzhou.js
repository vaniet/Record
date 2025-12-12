// 徐州人物数据
export const xuzhouCharacters = {
    title: '循舟纪之徐州',
    city: '徐州',
    characters: [
        {
            id: 1,
            name: '彭城守',
            role: '守将',
            image: '👨‍✈️',
            description: '徐州守将，负责城防，熟悉当地地理和历史。',
            relationships: [2, 3]
        },
        {
            id: 2,
            name: '商贾',
            role: '商人',
            image: '👨‍💼',
            description: '往来于徐州与各地的商人，消息灵通。',
            relationships: [1, 4]
        },
        {
            id: 3,
            name: '文士',
            role: '学者',
            image: '👨‍🎓',
            description: '研究徐州历史的学者，了解楚汉争霸的历史。',
            relationships: [1, 5]
        },
        {
            id: 4,
            name: '驿丞',
            role: '官员',
            image: '👨‍💼',
            description: '负责驿站事务的官员，掌握各地往来信息。',
            relationships: [2, 5]
        },
        {
            id: 5,
            name: '老船工',
            role: '船夫',
            image: '👨‍🚤',
            description: '在运河上工作多年的老船工，熟悉航道。',
            relationships: [3, 4]
        }
    ]
}

