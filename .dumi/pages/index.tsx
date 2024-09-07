import React, { useEffect, useMemo, useRef } from 'react';
import { Chart } from '@antv/g2';
import { history, useFullSidebarData } from 'dumi';

const getRandomNuber = (min: number, max: number) => {
  return Math.random() * (max - min)
}

const WordCloudChart = () => {
  const sidebar = useFullSidebarData();
  const list = useMemo(() => {
    const keys = Object.keys(sidebar)?.flatMap((item) => sidebar[item])?.flatMap((item) => {
      return item.children?.map((child) => ({
        text: child.title,
        link: child.link,
        value: getRandomNuber(10, 15)
      }))
    })
    return keys
  }, [sidebar])
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // 实例化Chart  
      const chart = new Chart({
        container: chartRef.current,
        padding: 0,
        width: 980
      });

      chart
        .wordCloud()
        .data(list) // 注意：这里直接传入数据对象，不需要type: 'fetch'  
        .layout({
          spiral: 'rectangular',
        })
        .encode('color', 'text')
        .axis(false)

      chart.interaction('tooltip', false);
      chart.on('element:click', (evt) => {
        const link = evt.data.data.link
        history.push(link)
      });
      chart.render();

      // 清理：当组件卸载时  
      return () => {
        chart.destroy();
      };
    }
  }, []); // 空依赖数组意味着useEffect只在组件挂载时运行一次  

  return <div ref={chartRef} id="container" style={{ width: 980, margin: '0 auto' }} />;
};

export default WordCloudChart;