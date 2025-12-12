// 汇总所有城市角色数据
import { beijingCharacters } from './beijing'
import { tianjinCharacters } from './tianjin'
import { liaochengCharacters } from './liaocheng'
import { xuzhouCharacters } from './xuzhou'
import { yangzhouCharacters } from './yangzhou'
import { suzhouCharacters } from './suzhou'
import { hangzhouCharacters } from './hangzhou'
import { nanjingCharacters } from './nanjing'

export const charactersData = {
    beijing: beijingCharacters,
    tianjin: tianjinCharacters,
    liaocheng: liaochengCharacters,
    xuzhou: xuzhouCharacters,
    yangzhou: yangzhouCharacters,
    suzhou: suzhouCharacters,
    hangzhou: hangzhouCharacters,
    nanjing: nanjingCharacters,
    default: {
        title: '渡客长卷',
        city: '运河',
        characters: [
            {
                id: 1,
                name: '示例角色一',
                role: '角色类型',
                image: '👤',
                description: '角色描述占位',
                relationships: [2]
            },
            {
                id: 2,
                name: '示例角色二',
                role: '角色类型',
                image: '👤',
                description: '角色描述占位',
                relationships: [1]
            }
        ]
    }
}

