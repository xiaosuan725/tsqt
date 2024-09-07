import React, { Children, useEffect, useRef, useState } from 'react';
import { Chart } from '@antv/g2';

const coldColors = [
  '#003f5f', '#2f4f4f', '#607d79', '#82ca9d', '#96e6a1',
  '#b5e6e6'
];

const data = [
  {
    color: '#003f5f',
    childrens: ['八卦锻造材料汇总', '职业饰品升级所需材料', '翅膀外形', '套装图', '每周经验表', '登录奖励', '心法计算器', '人物经验表']
  },
  {
    color: '#b5e6e6',
    childrens: ['骑宠风雷丹加成', '骑宠宠物加成']
  }
]

const WordCloudChart = () => {
  const list = data?.flatMap((item) => item.childrens?.map((children) => ({ color: item.color, text: children })))
  const chartRef = useRef(null);
  const [windowSize, setWindowSize] = useState( window.innerWidth);  
  
  useEffect(() => {  
    const handleResize = () => {  
      setWindowSize(window.innerWidth);  
    };  
  
    // 绑定事件监听器  
    window.addEventListener('resize', handleResize);  
  
    // 在组件卸载时解绑事件监听器  
    return () => {  
      window.removeEventListener('resize', handleResize);  
    };  
  }, []);  

  useEffect(() => {
    if (chartRef.current) {
      // 实例化Chart  
      const chart = new Chart({
        container: chartRef.current,
        padding: 0,
        width: windowSize > 980 ? 980 : windowSize
      });

      chart
        .wordCloud()
        .data(list) // 注意：这里直接传入数据对象，不需要type: 'fetch'  
        .layout({
          spiral: 'rectangular',
        })
        .encode('color', 'text')
        .axis(false)
        .style('fill', (datum: any) => {
          console.log('datum, index, data', datum)
          if (datum?.color) {
            return datum?.color
          }
        })

      chart.interaction('tooltip', false);
      chart.on('element:click', (evt) => {
        const { data } = evt
        console.log('Clicked on word:', data);
        // 执行其他逻辑  
      });
      chart.render();

      // 清理：当组件卸载时  
      return () => {
        chart.destroy();
      };
    }
  }, [windowSize]); // 空依赖数组意味着useEffect只在组件挂载时运行一次  

  return <div ref={chartRef} id="container" style={{ width: windowSize > 980 ? 980 : windowSize, margin: '0 auto' }} />;
};

export default WordCloudChart;