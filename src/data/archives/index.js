// 汇总所有城市档案数据
import { beijingArchive } from './beijing'
import { tianjinArchive } from './tianjin'
import { liaochengArchive } from './liaocheng'
import { xuzhouArchive } from './xuzhou'
import { yangzhouArchive } from './yangzhou'
import { suzhouArchive } from './suzhou'
import { hangzhouArchive } from './hangzhou'
import { nanjingArchive } from './nanjing'

export const archiveData = {
    beijing: beijingArchive,
    tianjin: tianjinArchive,
    liaocheng: liaochengArchive,
    xuzhou: xuzhouArchive,
    yangzhou: yangzhouArchive,
    suzhou: suzhouArchive,
    hangzhou: hangzhouArchive,
    nanjing: nanjingArchive,
    default: {
        city: '航行密档',
        entries: [
            {
                id: 1,
                title: '大运河',
                type: '历史名词',
                image: '🚢',
                description: '京杭大运河是世界上里程最长、工程最大的古代运河。',
                audio: '音频解说占位'
            },
            {
                id: 2,
                title: '漕运',
                type: '历史名词',
                image: '📦',
                description: '漕运是中国古代通过水路运输粮食等物资的制度。',
                audio: '音频解说占位'
            }
        ],
        research: {
            title: '运河文化考据',
            content: '运河文化源远流长，承载着中华民族的智慧与文明。'
        }
    }
}

