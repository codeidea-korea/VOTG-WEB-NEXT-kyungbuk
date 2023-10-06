import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import * as XLSX from 'xlsx'
/*MUI Element*/
import { Box, CircularProgress, Button, Card, CardActions, CardContent, Container, Divider, Grid, MenuItem, TextField, Typography, IconButton } from '@mui/material'
import { FileDropzone } from '@components/convert/ipa-file-dropzone'
/*Import Hooks*/
import { UuidTool } from 'uuid-tool'
import { useAuth } from '@hooks/use-auth'
import { useRouter } from 'next/router'
import { AuthGuard } from '@components/auth/auth-guard'
import { useMoveScroll } from '@hooks/use-move-scroll'
/* Compoent/Home */
import { HomeSectionDrag } from '@components/home/home-drag'
/*Improt Layouts*/
import LayoutWithServiceMenu from '@layouts/ws/layout-with-service-menu'
/* Echart */
import * as echarts from 'echarts';
// import 'echarts-stat';
import ecStat from 'echarts-stat';

//ELEMENT
const PAGE_TITLE = 'IPA 설문 업로드'

const Page_Ipaupload = () => {    
    const { user } = useAuth()

    //File Drop
    const [files, setFiles] = useState([])
    const [excelData, setExcelData] = useState([]);
    const [showChartSummary, setShowChartSummary] = useState(false);
    let worksheet = null;

    const handleDrop = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
        const file = newFiles[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, { type: 'binary' });

            const firstSheetName = workbook.SheetNames[0];
            worksheet = workbook.Sheets[firstSheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setExcelData(jsonData);
        };

        reader.readAsBinaryString(file);
    }

    const handleRemove = (file) => {
        setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path))
        globalThis.sessionStorage.removeItem('set-file-cache')
    }

    const handleRemoveAll = () => {
        setFiles([])
    }

    useEffect(() => {
        if (excelData !== undefined && excelData.length > 0) {
            //console.log(excelData)
            const cols =  excelData.length;
            const rows =  excelData[0].length;

            const data = [];

            for (let row = 0; row < rows; row++) {
                const rowData = [];
                for (let col = 1; col < cols; col++) {
                    //console.log(`${col}-${row} : `, excelData[col][row])
                    if (excelData[col][row] !== undefined) {
                        rowData.push(excelData[col][row]);
                    }else{
                        rowData.push(null);
                    }
                }
                data.push(rowData);
            }

            const xyData = [];
            const data1 = [];
            const data2 = [];
            const data3 = [];
            const data4 = [];
            const data5 = [];
            let first = 0;
			let x_total = 0;
			let y_total = 0;
            let y_total1 = 0; let y_total2 = 0; let y_total3 = 0; let y_total4 = 0; let y_total5 = 0; 
			let x_mean = 0;
			let y_mean = 0;

            for (let count = 0; count < data.length; count++) {
                if (count > 0 && count <= 30){
                    first = 0;
                    // 평균 계산
                    const mean1 = data[first].reduce((acc, val) => acc + val) / data[first].length;
                    const mean2 = data[count].reduce((acc, val) => acc + val) / data[count].length;
                    // 표준 편차 계산
                    const std1 = Math.sqrt(data[first].reduce((acc, val) => acc + (val - mean1) ** 2, 0) / (data[first].length - 1));
                    const std2 = Math.sqrt(data[count].reduce((acc, val) => acc + (val - mean2) ** 2, 0) / (data[count].length - 1));
                    // 공분산 게산
                    const cov = data[first].reduce((acc, val, idx) => acc + ((val - mean1) * (data[count][idx] - mean2)), 0) / (data[first].length - 1);
                    // 상관계수 계산
                    const corrcoef = cov / (std1 * std2);
                    // x축
                    const x_val = Math.round(mean2 * 1000) / 1000;
                    // y축
                    const y_val = Math.round(corrcoef * 1000) / 1000;
                    // 좌표값
                    y_total1 = y_total1 + y_val;
                }else if (count > 31 && count <= 61){
                    first = 31;
                    const mean1 = data[first].reduce((acc, val) => acc + val) / data[first].length;
                    const mean2 = data[count].reduce((acc, val) => acc + val) / data[count].length;
                    const std1 = Math.sqrt(data[first].reduce((acc, val) => acc + (val - mean1) ** 2, 0) / (data[first].length - 1));
                    const std2 = Math.sqrt(data[count].reduce((acc, val) => acc + (val - mean2) ** 2, 0) / (data[count].length - 1));
                    const cov = data[first].reduce((acc, val, idx) => acc + ((val - mean1) * (data[count][idx] - mean2)), 0) / (data[first].length - 1);
                    const corrcoef = cov / (std1 * std2);
                    const x_val = Math.round(mean2 * 1000) / 1000;
                    const y_val = Math.round(corrcoef * 1000) / 1000;
                    y_total2 = y_total2 + y_val;
                }else if (count > 62 && count <= 92){
                    first = 62;
                    const mean1 = data[first].reduce((acc, val) => acc + val) / data[first].length;
                    const mean2 = data[count].reduce((acc, val) => acc + val) / data[count].length;
                    const std1 = Math.sqrt(data[first].reduce((acc, val) => acc + (val - mean1) ** 2, 0) / (data[first].length - 1));
                    const std2 = Math.sqrt(data[count].reduce((acc, val) => acc + (val - mean2) ** 2, 0) / (data[count].length - 1));
                    const cov = data[first].reduce((acc, val, idx) => acc + ((val - mean1) * (data[count][idx] - mean2)), 0) / (data[first].length - 1);
                    const corrcoef = cov / (std1 * std2);
                    const x_val = Math.round(mean2 * 1000) / 1000;
                    const y_val = Math.round(corrcoef * 1000) / 1000;
                    y_total3 = y_total3 + y_val;
                }else if (count > 93 && count <= 123){
                    first = 93;
                    const mean1 = data[first].reduce((acc, val) => acc + val) / data[first].length;
                    const mean2 = data[count].reduce((acc, val) => acc + val) / data[count].length;
                    const std1 = Math.sqrt(data[first].reduce((acc, val) => acc + (val - mean1) ** 2, 0) / (data[first].length - 1));
                    const std2 = Math.sqrt(data[count].reduce((acc, val) => acc + (val - mean2) ** 2, 0) / (data[count].length - 1));
                    const cov = data[first].reduce((acc, val, idx) => acc + ((val - mean1) * (data[count][idx] - mean2)), 0) / (data[first].length - 1);
                    const corrcoef = cov / (std1 * std2);
                    const x_val = Math.round(mean2 * 1000) / 1000;
                    const y_val = Math.round(corrcoef * 1000) / 1000;
                    y_total4 = y_total4 + y_val;
                }else if (count > 124){
                    first = 124;
                    const mean1 = data[first].reduce((acc, val) => acc + val) / data[first].length;
                    const mean2 = data[count].reduce((acc, val) => acc + val) / data[count].length;
                    const std1 = Math.sqrt(data[first].reduce((acc, val) => acc + (val - mean1) ** 2, 0) / (data[first].length - 1));
                    const std2 = Math.sqrt(data[count].reduce((acc, val) => acc + (val - mean2) ** 2, 0) / (data[count].length - 1));
                    const cov = data[first].reduce((acc, val, idx) => acc + ((val - mean1) * (data[count][idx] - mean2)), 0) / (data[first].length - 1);
                    const corrcoef = cov / (std1 * std2);
                    const x_val = Math.round(mean2 * 1000) / 1000;
                    const y_val = Math.round(corrcoef * 1000) / 1000;
                    y_total5 = y_total5 + y_val;
                }
            }

            for (let count = 0; count < data.length; count++) {
                if (count > 0 && count <= 30){
                    first = 0;
                    // 평균 계산
                    const mean1 = data[first].reduce((acc, val) => acc + val) / data[first].length;
                    const mean2 = data[count].reduce((acc, val) => acc + val) / data[count].length;
                    // 표준 편차 계산
                    const std1 = Math.sqrt(data[first].reduce((acc, val) => acc + (val - mean1) ** 2, 0) / (data[first].length - 1));
                    const std2 = Math.sqrt(data[count].reduce((acc, val) => acc + (val - mean2) ** 2, 0) / (data[count].length - 1));
                    // 공분산 게산
                    const cov = data[first].reduce((acc, val, idx) => acc + ((val - mean1) * (data[count][idx] - mean2)), 0) / (data[first].length - 1);
                    // 상관계수 계산
                    const corrcoef = cov / (std1 * std2);
                    // x축
                    const x_val = Math.round(mean2 * 1000) / 1000;
                    // y축
                    const y_val = Math.round(corrcoef * 1000) / 1000;
                    // 좌표값
                    xyData.push([x_val, (y_val / y_total1)]);
					// 0~30 좌표값
                    data1.push([x_val, (y_val / y_total1)]);
					// 좌표값 합계
					x_total = x_total + x_val;
					y_total = y_total + (y_val / y_total1);
                }else if (count > 31 && count <= 61){
                    first = 31;
                    const mean1 = data[first].reduce((acc, val) => acc + val) / data[first].length;
                    const mean2 = data[count].reduce((acc, val) => acc + val) / data[count].length;
                    const std1 = Math.sqrt(data[first].reduce((acc, val) => acc + (val - mean1) ** 2, 0) / (data[first].length - 1));
                    const std2 = Math.sqrt(data[count].reduce((acc, val) => acc + (val - mean2) ** 2, 0) / (data[count].length - 1));
                    const cov = data[first].reduce((acc, val, idx) => acc + ((val - mean1) * (data[count][idx] - mean2)), 0) / (data[first].length - 1);
                    const corrcoef = cov / (std1 * std2);
                    const x_val = Math.round(mean2 * 1000) / 1000;
                    const y_val = Math.round(corrcoef * 1000) / 1000;
                    xyData.push([x_val, (y_val / y_total2)]);
					// 31~61 좌표값
                    data2.push([x_val, (y_val / y_total2)]);
					// 좌표값 합계
					x_total = x_total + x_val;
					y_total = y_total + (y_val / y_total2);
                }else if (count > 62 && count <= 92){
                    first = 62;
                    const mean1 = data[first].reduce((acc, val) => acc + val) / data[first].length;
                    const mean2 = data[count].reduce((acc, val) => acc + val) / data[count].length;
                    const std1 = Math.sqrt(data[first].reduce((acc, val) => acc + (val - mean1) ** 2, 0) / (data[first].length - 1));
                    const std2 = Math.sqrt(data[count].reduce((acc, val) => acc + (val - mean2) ** 2, 0) / (data[count].length - 1));
                    const cov = data[first].reduce((acc, val, idx) => acc + ((val - mean1) * (data[count][idx] - mean2)), 0) / (data[first].length - 1);
                    const corrcoef = cov / (std1 * std2);
                    const x_val = Math.round(mean2 * 1000) / 1000;
                    const y_val = Math.round(corrcoef * 1000) / 1000;
                    xyData.push([x_val, (y_val / y_total3)]);
					// 62~92 좌표값
                    data3.push([x_val, (y_val / y_total3)]);
					// 좌표값 합계
					x_total = x_total + x_val;
					y_total = y_total + (y_val / y_total3);
                }else if (count > 93 && count <= 123){
                    first = 93;
                    const mean1 = data[first].reduce((acc, val) => acc + val) / data[first].length;
                    const mean2 = data[count].reduce((acc, val) => acc + val) / data[count].length;
                    const std1 = Math.sqrt(data[first].reduce((acc, val) => acc + (val - mean1) ** 2, 0) / (data[first].length - 1));
                    const std2 = Math.sqrt(data[count].reduce((acc, val) => acc + (val - mean2) ** 2, 0) / (data[count].length - 1));
                    const cov = data[first].reduce((acc, val, idx) => acc + ((val - mean1) * (data[count][idx] - mean2)), 0) / (data[first].length - 1);
                    const corrcoef = cov / (std1 * std2);
                    const x_val = Math.round(mean2 * 1000) / 1000;
                    const y_val = Math.round(corrcoef * 1000) / 1000;
                    xyData.push([x_val, (y_val / y_total4)]);
					// 93~123 좌표값
                    data4.push([x_val, (y_val / y_total4)]);
					// 좌표값 합계
					x_total = x_total + x_val;
					y_total = y_total + (y_val / y_total4);
                }else if (count > 124){
                    first = 124;
                    const mean1 = data[first].reduce((acc, val) => acc + val) / data[first].length;
                    const mean2 = data[count].reduce((acc, val) => acc + val) / data[count].length;
                    const std1 = Math.sqrt(data[first].reduce((acc, val) => acc + (val - mean1) ** 2, 0) / (data[first].length - 1));
                    const std2 = Math.sqrt(data[count].reduce((acc, val) => acc + (val - mean2) ** 2, 0) / (data[count].length - 1));
                    const cov = data[first].reduce((acc, val, idx) => acc + ((val - mean1) * (data[count][idx] - mean2)), 0) / (data[first].length - 1);
                    const corrcoef = cov / (std1 * std2);
                    const x_val = Math.round(mean2 * 1000) / 1000;
                    const y_val = Math.round(corrcoef * 1000) / 1000;
                    xyData.push([x_val, (y_val / y_total5)]);
					// 124~150 좌표값
                    data5.push([x_val, (y_val / y_total5)]);
					// 좌표값 합계
					x_total = x_total + x_val;
					y_total = y_total + (y_val / y_total5);
                }
            }
            
            console.log(data)
            console.log(xyData)
            setShowChartSummary(true);

            var chartDom = document.getElementById('chart-container');
            var myChart = echarts.init(chartDom);
            var option;

			// x평균/y평균
			x_mean = x_total/150;
			y_mean = y_total/150;
			//console.log(data.length);
			//console.log(x_total+'/'+y_total);
			//console.log(x_mean+'/'+y_mean);

			// X축/Y축 최소값/최대값 구하기
			var xmin = data1[0][0];
			var xmax = data1[0][0];
			var ymin = data1[0][1];
			var ymax = data1[0][1];

			for (var k = 0; k < data1.length; k++) {
				if(data1[k][0]<xmin){          xmin = data1[k][0];      }    
				if(data1[k][0]>xmax){          xmax = data1[k][0];      }
				if(data1[k][1]<ymin){          ymin = data1[k][1];      }
				if(data1[k][1]>ymax){          ymax = data1[k][1];      }
			}
			for (var k = 0; k < data2.length; k++) {
				if(data2[k][0]<xmin){          xmin = data2[k][0];      }    
				if(data2[k][0]>xmax){          xmax = data2[k][0];      }
				if(data2[k][1]<ymin){          ymin = data2[k][1];      }
				if(data2[k][1]>ymax){          ymax = data2[k][1];      }
			}
			for (var k = 0; k < data3.length; k++) {
				if(data3[k][0]<xmin){          xmin = data3[k][0];      }    
				if(data3[k][0]>xmax){          xmax = data3[k][0];      }
				if(data3[k][1]<ymin){          ymin = data3[k][1];      }
				if(data3[k][1]>ymax){          ymax = data3[k][1];      }
			}
			for (var k = 0; k < data4.length; k++) {
				if(data4[k][0]<xmin){          xmin = data4[k][0];      }    
				if(data4[k][0]>xmax){          xmax = data4[k][0];      }
				if(data4[k][1]<ymin){          ymin = data4[k][1];      }
				if(data4[k][1]>ymax){          ymax = data4[k][1];      }
			}
			for (var k = 0; k < data5.length; k++) {
				if(data5[k][0]<xmin){          xmin = data5[k][0];      }    
				if(data5[k][0]>xmax){          xmax = data5[k][0];      }
				if(data5[k][1]<ymin){          ymin = data5[k][1];      }
				if(data5[k][1]>ymax){          ymax = data5[k][1];      }
			}

			xmin = (Math.round(xmin*0.99*1000)/1000).toFixed(3);
			xmax = (Math.round(xmax*1.01*1000)/1000).toFixed(3);
			ymin = (Math.round(ymin*0.9*1000)/1000).toFixed(3);
			ymax = (Math.round(ymax*1.1*1000)/1000).toFixed(3);
            console.log(xmin+'/'+xmax+'/'+ymin+'/'+ymax);

            option = {
			  legend: {},
			  grid: {
			 	  left: '100',
				  right: '200',
				  bottom: '0',
				  top: '100',
				  containLabel: true
			  },
			  xAxis: [
				{
				  name: 'Performance\n(Mean Satisfaction Scores)',
				  type: 'value',
				  scale: true,
				  axisLabel: {
					formatter: '{value} '
				  },
				  splitLine: {
					show: false
				  },
				  min: xmin,
				  max: xmax,
				  axisLine: { onZero: false }
				}
				],
				yAxis: [
				{
				  name: 'Importance\n(Correclation with Overall Satisfaction)',
				  type: 'value',
				  scale: true,
				  axisLabel: {
					formatter: '{value} '
				  },
				  splitLine: {
					show: false
				  },
				  min: ymin,
				  max: ymax,
				  axisLine: { onZero: false }
				}
			  ],
			  series: [
				{
				  name: '입지 만족도와 중요도',
				  type: 'scatter',
				  emphasis: {
					focus: 'series'
				  },
				  // prettier-ignore
				  data: data1,
				  symbolSize: 8,
				},
				{
				  name: '배치 만족도와 중요도',
				  type: 'scatter',
				  emphasis: {
					focus: 'series'
				  },
				  // prettier-ignore
				  data: data2,
				  symbolSize: 8,
				},
				{
				  name: '건물외관 만족도와 중요도',
				  type: 'scatter',
				  emphasis: {
					focus: 'series'
				  },
				  // prettier-ignore
				  data: data3,
				  symbolSize: 8,
				},
				{
				  name: '단위공간 만족도와 중요도',
				  type: 'scatter',
				  emphasis: {
					focus: 'series'
				  },
				  // prettier-ignore
				  data: data4,
				  symbolSize: 8,
				},
				{
				  name: '주변환경 만족도와 중요도',
				  type: 'scatter',
				  emphasis: {
					focus: 'series'
				  },
				  // prettier-ignore
				  data: data5,
				  symbolSize: 8,
				},
				{
				  type: 'scatter',
				  emphasis: {
					focus: 'series'
				  },
				  markLine: {
					lineStyle: {
					  type: 'dashed'
					},
					data: [
					  {
						name: 'average',
						xAxis: x_mean
					  },
					  {
						name: 'average',
						yAxis: y_mean
					  },
					]
				  }
				},
			  ]
			};

            myChart.setOption(option);
        }
    }, [excelData])

    const graphStyle = {
        graphbox:{
            position:'relative',
            width:'100%',
            paddingBottom:'50%'
        },
        graph:{
            position:'absolute',
            left:'0',top:'0',
            width:'100%',
            height:'100%'
        },
        info:{
            background: 'rgba(253,240,239,1)',
            padding:'20px 0px',
            width:'110px',
        },
        p:{
            margin:'0 auto',
            fontSize:'14px',
            fontWeight:'500'
        }
    }
    
    return (
        <>
            <Head>
                <title>{PAGE_TITLE} | 인공지능 기반 건축설계 자동화 기술개발 연구단</title>
            </Head>
            <Container
                component="main"
                maxWidth="lg"
                sx={{
                    flexGrow: 1,
                    py: 5,
                    background: '#fff',
                    minHeight: 'calc(100vh - 150px)',
                }}
            >
                {/* Title Line */}
                <Box sx={{ mb: 4 }}>
                    <Grid container justifyContent="space-between" spacing={3}>
                        <Grid item>
                            <Typography variant="h4">IPA 설문 업로드</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ mb: 3 }} />
                {/* Empty Title Line */}
                <Box
                    sx={{
                        mt: 2,
                        background: 'rgba(253,240,239,1)',
                    }}
                >
                    <FileDropzone
                        accept={{
                            'application/xls': ['.xls', '.xlsx'],
                        }}
                        files={files}
                        onDrop={handleDrop}
                        onRemove={handleRemove}
                        onRemoveAll={handleRemoveAll}
                    />
                </Box>

                <Box
                    sx={{
                        mt: 2,
                    }}
                >
                    <div className='graph_wrap'>
                        <div style={graphStyle.info}>
                            <p style={graphStyle.p}>IPA 분석 그래프</p>
                            <p style={graphStyle.p}>표본 : {excelData.length-1}개</p>
                            {/* <p style={graphStyle.p}>업로드 일시 :</p>
                            <p style={graphStyle.p}>{new Date().toLocaleTimeString()}</p> */}
                        </div>
                        <div className="graph_box" >
                            <div id="chart-container" className='graph' ></div>
                        </div>
                    </div>
                </Box>

               
                {/* Selected Item List */}
            </Container>
        </>
    )
}

Page_Ipaupload.getLayout = (page) => (
    <AuthGuard>
        <LayoutWithServiceMenu>{page}</LayoutWithServiceMenu>
    </AuthGuard>
)

export default Page_Ipaupload