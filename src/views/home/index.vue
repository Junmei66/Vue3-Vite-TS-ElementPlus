<template>
  <div class="container">
    <div class="list-box">
      <div class="chart-box">
        <div class="title">前端框架</div>
        <div v-for="item in perctData" :key="item.id" class="item">
          <span class="item-title">{{ item.title }}</span>
          <el-tooltip class="box-item" effect="customized" placement="bottom">
            <template #content
              >熟练程度<br />
              {{ item.title }}：{{ item.value }}%</template
            >
            <el-progress
              :text-inside="true"
              :stroke-width="16"
              :percentage="item.value"
              :color="item.color"
            ></el-progress>
          </el-tooltip>
        </div>
      </div>
      <div class="chart-box">
        <div class="title">UI框架</div>
        <div ref="line" class="chart" id="line"></div>
      </div>
      <div class="chart-box">
        <div class="title">项目分布</div>
        <div ref="pie" class="chart" id="pie"></div>
      </div>
      <div class="chart-box">
        <div class="title">综合分析</div>
        <div ref="radar" class="chart" id="radar"></div>
      </div>
      <div class="chart-box w100">
        <div class="title">动态Echarts</div>
        <div ref="last" class="chart" id="last"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive } from "vue";
import { getSkills, getCapability, getProjects, getUis } from "@/api/index";

import * as echarts from "echarts";
import { skillItem } from "@/types/response";
const colors = ["#42b983","#01b9ef","#dd0031","#2183c8","#6950a3","#d93b95","#ee5a73","#f47122","#fdf200","#fedc00","#bad875","#4db657","#67c18f","#02a890"]
const colColors = [
  "#42b983",
  "#ff8b1d",
  "#dd0031",
  "#61dafb",
  "#6a3252",
  "#2d3e50",
  "#409eff",
  "#393d49",
  "#f89c44",
];
interface PerctItem {
  id: number;
  value: number;
  color: string;
}

let perctData: PerctItem[] = reactive([]);

const lineOption = reactive({
  // title: { text: "UI" },
  tooltip: {},
  xAxis: {
    data: [] as any,
  },
  yAxis: {},
  series: [
    {
      name: "使用率",
      type: "bar",
      barWidth: 20,
      label: {
        show: true,
        position: "top",
      },
      color: [
        "#409eff",
        "#42b983",
        "#6a3252",
        "#2d3e50",
        "#409eff",
        "#393d49",
        "#f89c44",
      ],
      data: [] as any,
      colorBy: "data",
    },{
      name: "使用率",
      type: "line",
      color: "#f65a06",
      symbol: 'triangle',
      // symbolOffset: [0, -2],
      symbolSize: 8,
      data: [] as any,
    },
  ],
});

const pieOption = reactive({
  // title: { text: "项目类型" },
  // color: ['#59a4ff', '#ffbd2a', '#b37feb', '#4ace82','#ff745e', '#26d0ff', '#f6cc00'],
  color: [
    "#42b983",
    "#ff8b1d",
    "#f7e262",
    "#8e58df",
    "#f8335f",
    "#26d0ff",
    "#b37feb",
  ],
  tooltip: {
    formatter: function (params: any) {
      return params.name + "：" + params.value + "%";
    },
  },
  series: [
    {
      name: "项目类型",
      type: "pie",
      radius: [60, 90],
      center: ["50%", "50%"],
      label: {
        show: true,
        formatter: function (params: any) {
          return params.name + "：" + params.value + "%";
        },
      },
      emphasis: {
        label: {
          show: true,
        },
      },
      data: [] as any,
    },
  ],
});

const radarOption = reactive({
  // title: { text: "综合" },
  tooltip: {
    trigger: "axis",
  },
  radar: {
    indicator: [] as any,
    shape: "circle",
    splitNumber: 5,
    axisName: {
      color: "rgb(3, 169, 244)",
      formatter: "{value}力",
    },
    splitLine: {
      lineStyle: {
        color: [
          "rgba(238, 197, 102, 0.1)",
          "rgba(238, 197, 102, 0.2)",
          "rgba(238, 197, 102, 0.4)",
          "rgba(238, 197, 102, 0.6)",
          "rgba(238, 197, 102, 0.8)",
          "rgba(238, 197, 102, 1)",
        ].reverse(),
      },
    },
    splitArea: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "rgba(238, 197, 102, 0.5)",
      },
    },
  },
  series: [
    {
      name: "能力分析",
      type: "radar",
      itemStyle: {
        color: "#6584f6",
      },
      areaStyle: {
        opacity: 0.5,
      },
      data: [{ value: [] as any }],
      label: {
        show: true,
        formatter: function (params: any) {
          return params.value + "分";
        },
        position: "top",
      },
    },
  ],
});

const data: number[] = []
for (let i = 0; i < 9; ++i) {
  data.push(Math.round(Math.random() * 200))
}

const years: number[] = []
for (let i = 0; i <= new Date().getFullYear(); ++i) {
  years.push(i)
}

let startIndex = 1996
let startYear = years[startIndex]
const lastOption = reactive({
  xAxis: {
    max: "dataMax",
  },
  yAxis: {
    type: "category",
    data: ["Vue", "Uni-app", "Angular", "React", "JQuery", "Mui", "JavaScript", "Element-Ui", "Ant-Design"],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 5,
  },
  series: [
    {
      realtimeSort: true,
      name: "发展",
      type: "bar",
      data: data,
      label: {
        show: true,
        position: "right",
        valueAnimation: true,
      },
      itemStyle: {
        color: function (param: any) {
          return colors[param.dataIndex] || "#5470c6";
        },
      },
    },
  ],
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: "linear",
  animationEasingUpdate: "linear",
  graphic: {
    elements: [
      {
        type: "text",
        right: 20,
        bottom: 60,
        style: {
          text: startYear,
          font: "bolder 40px monospace",
          fill: "rgba(100, 100, 100, 0.25)",
        },
        z: 100,
      },
    ],
  },
});

function updateYear(year: number, lastChart: echarts.ECharts) {
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }
  lastOption.series[0].data = data;
  lastOption.graphic.elements[0].style.text = year;

  lastChart.setOption(lastOption as echarts.EChartsOption);
}

function setLastChart(lastChart: echarts.ECharts) {
  for (let i = startIndex; i < years.length - 1; ++i) {
    (function (i) {
      setTimeout(function () {
        updateYear(years[i + 1], lastChart);
      }, (i - startIndex) * 2000);
    })(i);
  }
}
onBeforeUnmount(() => {
  clearTimeout();
});

function getData(
  lineChart: echarts.ECharts,
  pieChart: echarts.ECharts,
  radarChart: echarts.ECharts
) {
  getSkills().then((res) => {
    // console.log(res);
    if (res.status == 200) {
      res.data.map((item: skillItem, index: number) => {
        perctData[index] = { ...item, ...{ color: colColors[index] } };
      });
    }
  });
  getUis().then((res) => {
    if (res.status == 200) {
      let xData: string[] = [];
      let yData: number[] = [];
      res.data.map((item: any) => {
        xData.push(item.name);
        yData.push(item.value);
      });
      lineOption.xAxis.data = xData;
      lineOption.series[0].data = yData;
      lineOption.series[1].data = yData;

      setTimeout(() => {
        lineChart.setOption(lineOption);
      }, 100);
    }
  });
  getProjects().then((res) => {
    if (res.status == 200) {
      res.data.map((item: any) => {
        pieOption.series[0].data.push({
          value: item.value,
          name: item.name,
        });
      });

      setTimeout(() => {
        pieChart.setOption(pieOption);
      }, 100);
    }
  });
  getCapability().then((res) => {
    console.log(res);
    if (res.status == 200) {
      res.data.map((item: any) => {
        radarOption.radar.indicator.push({
          name: item.title,
          max: 10,
        });
        radarOption.series[0].data[0].value.push(item.value);
      });

      setTimeout(() => {
        radarChart.setOption(radarOption);
      }, 100);
    }
  });
}

onMounted(() => {
  const lineChart = echarts.init(
    document.getElementById("line") as HTMLDivElement
  );
  const pieChart = echarts.init(
    document.getElementById("pie") as HTMLDivElement
  );
  const radarChart = echarts.init(
    document.getElementById("radar") as HTMLDivElement
  );
  const lastChart = echarts.init(
    document.getElementById("last") as HTMLDivElement
  );

  getData(lineChart, pieChart, radarChart);
  setLastChart(lastChart);

  window.addEventListener("resize", () => {
    lineChart.resize();
    pieChart.resize();
    radarChart.resize();
    lastChart.resize();
  });
});

</script>

<style>
.el-popper.is-customized {
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>

<style scoped lang="scss">
.container {
  background: #f2f2f2;
  padding: 12px;
  width: 100%;
  margin-left: -12px;
  margin-top: -12px;
}
.list-box {
  display: flex;
  flex-wrap: wrap;
}
.chart-box {
  background: #ffffff;
  border-radius: 12px;
  margin: 6px;
  padding: 16px;
  width: calc(50% - 44px);
  height: 300px;
  &.w100 {
    width: 100%;
  }
  .title {
    font-weight: 600;
    &::before {
      content: "";
      width: 4px;
      height: 16px;
      background: #3776fd;
      display: inline-flex;
      position: relative;
      top: 2px;
      margin-right: 6px;
    }
  }
  .item {
    margin-top: 4px;

    .item-title {
      font-size: 14px;
      font-weight: 600;
    }
    .el-progress {
      margin-bottom: 10px;
      &:hover {
        background: rgba($color: #e9e7e7, $alpha: 0.1);
      }
    }
  }
  .chart {
    width: 100%;
    height: 100%;
  }
}

@media screen and(max-width: 640px) {
  .chart-box {
    width: 100%;
  }
}
</style>
