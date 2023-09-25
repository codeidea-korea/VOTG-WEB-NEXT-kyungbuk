import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import Head from 'next/head'
import axios from 'axios'

/*MUI Element*/
import { Box, CircularProgress, Button, Card, CardActions, CardContent, Container, Divider, Grid, MenuItem, TextField, Typography, IconButton } from '@mui/material'


import { FileDropzone } from '@components/convert/home-file-dropzone-demo'

/*Import Hooks*/
import { useAuth } from '@hooks/use-auth'
import { useRouter } from 'next/router'
import { AuthGuard } from '@components/auth/auth-guard'
import { useMoveScroll } from '@hooks/use-move-scroll'
/* Compoent/Home */
import { HomeSectionDrag } from '@components/home/home-drag'

//ELEMENT
const PAGE_TITLE = 'IPA 설문 업로드'

/*Improt Layouts*/
import LayoutWithServiceMenu from '@layouts/ws/layout-with-service-menu'

/* Echart */
import * as echarts from 'echarts';
// import 'echarts-stat';
import ecStat from 'echarts-stat';
import { FileDropzone2 } from '@components/convert/home-file-dropzone-demo2'



const Page_Ipaupload = () => {

    const { element, onMoveToElement } = useMoveScroll()
    
    /* File Setting */
    const [files, setFiles] = useState([])
    const [fileName, setFileName] = useState('')
    useEffect(() => {
        if (globalThis.sessionStorage.getItem('set-file-cache') !== null) {
            globalThis.sessionStorage.removeItem('set-file-cache')
        }
    }, [])

    const handleDrop = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }

    const handleRemove = (file) => {
        setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path))
        globalThis.sessionStorage.removeItem('set-file-cache')
    }

    const handleRemoveAll = () => {
        setFiles([])
    }

    useEffect(()=>{
        // ECharts 차트를 그릴 DOM 요소 가져오기
                
            var chartDom = document.getElementById('chart-container');
            var myChart = echarts.init(chartDom);
            var option;

            // See https://github.com/ecomfe/echarts-stat
            echarts.registerTransform(ecStat.transform.clustering);
            const data = [
            [3.275154, 2.957587],
            [-3.344465, 2.603513],
            [0.355083, -3.376585],
            [1.852435, 3.547351],
            [-2.078973, 2.552013],
            [-0.993756, -0.884433],
            [2.682252, 4.007573],
            [-3.087776, 2.878713],
            [-1.565978, -1.256985],
            [2.441611, 0.444826],
            [-0.659487, 3.111284],
            [-0.459601, -2.618005],
            [2.17768, 2.387793],
            [-2.920969, 2.917485],
            [-0.028814, -4.168078],
            [3.625746, 2.119041],
            [-3.912363, 1.325108],
            [-0.551694, -2.814223],
            [2.855808, 3.483301],
            [-3.594448, 2.856651],
            [0.421993, -2.372646],
            [1.650821, 3.407572],
            [-2.082902, 3.384412],
            [-0.718809, -2.492514],
            [4.513623, 3.841029],
            [-4.822011, 4.607049],
            [-0.656297, -1.449872],
            [1.919901, 4.439368],
            [-3.287749, 3.918836],
            [-1.576936, -2.977622],
            [3.598143, 1.97597],
            [-3.977329, 4.900932],
            [-1.79108, -2.184517],
            [3.914654, 3.559303],
            [-1.910108, 4.166946],
            [-1.226597, -3.317889],
            [1.148946, 3.345138],
            [-2.113864, 3.548172],
            [0.845762, -3.589788],
            [2.629062, 3.535831],
            [-1.640717, 2.990517],
            [-1.881012, -2.485405],
            [4.606999, 3.510312],
            [-4.366462, 4.023316],
            [0.765015, -3.00127],
            [3.121904, 2.173988],
            [-4.025139, 4.65231],
            [-0.559558, -3.840539],
            [4.376754, 4.863579],
            [-1.874308, 4.032237],
            [-0.089337, -3.026809],
            [3.997787, 2.518662],
            [-3.082978, 2.884822],
            [0.845235, -3.454465],
            [1.327224, 3.358778],
            [-2.889949, 3.596178],
            [-0.966018, -2.839827],
            [2.960769, 3.079555],
            [-3.275518, 1.577068],
            [0.639276, -3.41284]
            ];
            var CLUSTER_COUNT = 6;
            var DIENSIION_CLUSTER_INDEX = 2;
            var COLOR_ALL = [
            '#37A2DA',
            '#e06343',
            '#37a354',
            '#b55dba',
            '#b5bd48',
            '#8378EA',
            '#96BFFF'
            ];
            var pieces = [];
            for (var i = 0; i < CLUSTER_COUNT; i++) {
            pieces.push({
                value: i,
                label: 'cluster ' + i,
                color: COLOR_ALL[i]
            });
            }
            option = {
            dataset: [
                {
                source: data
                },
                {
                transform: {
                    type: 'ecStat:clustering',
                    // print: true,
                    config: {
                    clusterCount: CLUSTER_COUNT,
                    outputType: 'single',
                    outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
                    }
                }
                }
            ],
            tooltip: {
                position: 'top'
            },
            visualMap: {
                type: 'piecewise',
                top: 'middle',
                min: 0,
                max: CLUSTER_COUNT,
                left: 10,
                splitNumber: CLUSTER_COUNT,
                dimension: DIENSIION_CLUSTER_INDEX,
                pieces: pieces
            },
            grid: {
                left: 120
            },
            xAxis: {},
            yAxis: {},
            series: {
                type: 'scatter',
                encode: { tooltip: [0, 1] },
                symbolSize: 15,
                itemStyle: {
                borderColor: '#555'
                },
                datasetIndex: 1
            }
            };

            myChart.setOption(option);
    },[]);

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
            padding:'20px 10px',
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
                    <FileDropzone2
                        accept={{
                            'application/pdf': [],
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
                            <p style={graphStyle.p}>표본 : 600개</p>
                            <p style={graphStyle.p}>업로드 일시 :</p>
                            <p style={graphStyle.p}>2023-09-06 14:00:00</p>
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
