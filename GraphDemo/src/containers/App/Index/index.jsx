/*
 * @Description: 
 * @Author: shuqianwen
 * @Date: 2019-09-06 18:20:31
 * @LastEditors  : shuqianwen
 * @LastEditTime : 2020-01-17 14:22:17
 */
import React, { Component } from 'react'
import style from './style.scss'
import { Divider } from 'antd';
import { DemoDataCache } from './data'
require('libs/GraphVis/js/visgraph-1.0.2.min.js')

const APIKey = 'dbp'; //图工具授权用户key

class Index extends Component {

    state = {
        canvasWidth: 800,
        canvasHeight: 500,
        mode: 'normal',
        eyeview: false
    }

    init = () => {
        this.visgraph = this.initVisGraph('graphPanelRef');

        //2、模拟加载服务端数据，可视化显示
        let data = this.loadData();
        this.visgraph.drawData(data);

        this.visgraph.setZoom('auto');

        //3、根据需要自定义显示样式
        this.definedGraphStyle();
    }

    //初始化图客户端对象，用于操作及调用接口
    initVisGraph = (visDomRef) => {
        //定义节点的右键菜单项，自己组织界面元素，及事件操作，该方法中会注入图客户端及对应操作元素
        //示例如下，必须实现以下三个方法:init,show,hide
        let NodeRightMenu = {
            // init: function (_graph) {
            //     $("#graph-panel-wrapper").append("<menu>...</menu>");
            //     $("#graph-panel-wrapper").on('click', '#contextMenu .menu-btn', function () {

            //     });
            // },
            // show: function (e, _graph) {
            //     this.init(_graph);
            //     $("#contextMenu").css({ top: e.pageY - 30, left: e.pageX }).show();
            // },
            // hide: function () {
            //     $("#contextMenu").hide();
            // }
        };

        //连线的右键菜单操作
        let LinkRightMenu = {
            // init: function (_graph, link) {
            //     //自定义右键菜单界面元素
            // },
            // show: function (e, _graph, link) { },
            // hide: function () { }
        };

        //创建图对象
        let _visGraph = new VisGraph(this.refs[visDomRef],
            {
                'apikey': APIKey,//apikey 永久需要授权，默认下载三个月有效期
                // 'rightMenu': {
                //     nodeMenu: NodeRightMenu,  //节点右键菜单配置
                //     linkMenu: LinkRightMenu   // 连线右键菜单配置
                // },
                onNodeClick: (event, node) => { //节点点击事件回调
                    // do something
                    //console.log('clcik me');
                },
                highLightNeiber: true, //相邻节点高度标志
                wheelZoom: 1//滚轮缩放开关，不使用时不设置
            }
        );
        return _visGraph;
    };

    //加载图数据，可ajax请求服务端返回数据，格式如{nodes:[],links:[]}
    loadData = () => {
        return DemoDataCache['data1'];
    };

    //按自己需求重新设置可视化元素（点、边）的样式
    definedGraphStyle = () => {

        //以下为自定义设置点和边的样式（颜色、大小等等均可自定义）
        let gdata = this.visgraph.getGraphData();//获取绘图后的图数据

        let nodes = gdata.nodes;//获取所有点，设置点的样式
        nodes.forEach(function (node) {

            let inDegree = (node.inLinks || []).length; //获取节点的入度
            let outDegree = (node.outLinks || []).length; //获取节点的出度

            //对度大于3的点显示标签，设置为选中样式
            if ((inDegree + outDegree) > 3) {
                node.showlabel = true;  //显示点的标签
                //node.selected=true;   //显示选中样式
                //node.setImage('images/T1030001.svg');//设置图片路径
            }
            node.font = '30px yahei'; //字体大小 类型
            node.fontColor = '50,50,50'; //点的字体颜色
            node.textPosition = 'Bottom_Center'; //字体位置（下方居中）

            //node.wrapText = true;//节点大小包裹文字
            //node.fillColor=randomColor();//点填充颜色
            //node.shape='star'; //点形状设置
        });


        //设置边的可视化样式
        let links = gdata.links; //获取所有边
        links.forEach(function (link) {
            link.showlabel = true; //显示连线的标签
            link.fontColor = '50,50,50';//设置边的标签颜色

            link.lineWidth = 3;//设置连线的粗细
            link.colorType = 'd'; //连线的颜色继承源节点 s:源点 t:目标点 d:自定义
            link.strokeColor = '115,115,115'; //设置边的颜色
        });
    };

    // 左侧菜单 缩放组按钮事件，包括：放大、缩小、1:1、自适应
    zoom = (method) => {
        this.visgraph.setZoom(method)
    }

    // 左侧菜单 坐标组按钮事件，包括：坐标放大、坐标缩小、顺时针/逆时针旋转 
    // 坐标放大和缩小与上一个放大缩小的群别在于，后者画布放大缩小，节点大小会随着放大缩小
    // 前者坐标放大缩小，节点大小不会改变
    coordi = (method) => {
        if (method == 'zoomOut' || method == 'zoomIn') {
            this.visgraph.translateOrZoom(method, 100);
        } else if (method == 'east') {
            this.visgraph.rotateGraph(-10);
        } else if (method == 'west') {
            this.visgraph.rotateGraph(10);
        }
    }

    // 模式切换，包括正常模式、框选模式、拖拽模式
    mode = (method) => {
        this.visgraph.setMouseModel(method);
        this.setState({
            mode: method
        })
    }

    // 保存图片
    saveImage = () => {
        this.visgraph.backGroundType = 'png';//使用高清白色背景，不指定是无背景默认黑色
        this.visgraph.saveImage(2000, 2000); //保存图片的宽和高，图片过大时下载需要指定大小
    }

    // 缩略图展示/隐藏
    eyeview = (flag) => {
        if (!flag) {
            this.visgraph.showOverView(true);
        } else {
            this.visgraph.showOverView(false)
        }
        this.setState({
            eyeview: !flag
        })
    }

    // 浏览器窗口大小变化监听
    onResize = () => {
        let width = document.body.clientWidth - 50
        let height = document.body.clientHeight
        this.setState({
            canvasWidth: width,
            canvasHeight: height - 3
        }, () => {
            if (this.visgraph) {
                this.visgraph.setZoom('auto');
            }
        })
    }

    componentDidMount() {
        let width = document.body.clientWidth - 50
        let height = document.body.clientHeight
        this.setState({
            canvasWidth: width,
            canvasHeight: height - 3
        }, () => {
            this.init()
        })

        window.addEventListener('resize', this.onResize)
    }

    componentWillMount() {
        window.removeEventListener('resize', this.onResize)
    }

    render() {
        const { canvasWidth, canvasHeight, eyeview, mode } = this.state

        return (
            <div className={style.index}>
                <div className={style.leftToolbar}>
                    <ul>
                        <li title="放大" onClick={() => this.zoom('zoomOut')}><i className="iconfont">&#xe600;</i></li>
                        <li title="缩小" onClick={() => this.zoom('zoomIn')}><i className="iconfont">&#xe627;</i></li>
                        <li title="1:1" onClick={() => this.zoom('zoom1')}><i className="iconfont">&#xe72f;</i></li>
                        <li title="自适应" onClick={() => this.zoom('auto')}><i className="iconfont">&#xe6f0;</i></li>
                        <Divider />
                        <li title="坐标放大" onClick={() => this.coordi('zoomOut')}><i className="iconfont">&#xe6ea;</i></li>
                        <li title="坐标缩小" onClick={() => this.coordi('zoomIn')}><i className="iconfont">&#xe6ff;</i></li>
                        <li title="顺时针旋转" onClick={() => this.coordi('east')}><i className="iconfont">&#xe66a;</i></li>
                        <li title="逆时针旋转" onClick={() => this.coordi('west')}><i className="iconfont">&#xe66b;</i></li>
                        <Divider />
                        <li title="正常模式" onClick={() => this.mode('normal')} className={mode == 'normal' ? style.active : ''}><i className="iconfont">&#xe630;</i></li>
                        <li title="框选模式" onClick={() => this.mode('select')} className={mode == 'select' ? style.active : ''}><i className="iconfont">&#xe6e2;</i></li>
                        <li title="拖拽模式" onClick={() => this.mode('drag')} className={mode == 'drag' ? style.active : ''}><i className="iconfont">&#xe616;</i></li>
                        <Divider />
                        <li title="保存图片" onClick={() => this.saveImage()}><i className="iconfont">&#xe63b;</i></li>
                        <li title="缩略图" onClick={() => this.eyeview(eyeview)}>
                            {
                                eyeview ?
                                    <i className="iconfont">&#xe60d;</i> :
                                    <i className="iconfont">&#xe746;</i>
                            }
                        </li>
                    </ul>
                </div>
                <div className={style.wrapperPanel}>
                    <canvas id="graphPanel" ref="graphPanelRef" width={canvasWidth} height={canvasHeight}></canvas>
                </div>
            </div>
        )
    }
}

export default Index