import { useMemberStore } from "@/stores";

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
    // l拦截前触发
    invoke(options: UniApp.RequestOptions) {
        // 拼接地址
        console.log(options,"4444");

        console.log(options.url.startsWith('http'),"888");

        if (!options.url.startsWith('http')) {
            options.url = baseURL + options.url
        }
        options.timeout=10000
        //添加小程序请求头标识
        options.header={
            ...options.header,
            'source-client':"miniapp"
        }
        const memberStroe=useMemberStore()
        console.log(memberStroe,"memberStroe");

        console.log(memberStroe.profile?.token,"memberStroe.profile");

        const token =memberStroe.profile?.token
        if (token) {
            options.header.Authorization=token
        }
        console.log(options)
    }
}
uni.addInterceptor("request", httpInterceptor)
uni.addInterceptor("uploadFile", httpInterceptor)

interface Data<T>{
    code:string
    msg:string
    result:T
}
// 封装请求函数
export const http=<T>(options: UniApp.RequestOptions)=>{
    return new Promise<Data<T>>((resolve,reject)=>{
        uni.request({
            ...options,
            // 请求成功
            success(res){
                // resolve(res.data as Data<T>)
                if (res.statusCode>=200&&res.statusCode<300) {
                resolve(res.data as Data<T>)

                } else if(res.statusCode===401) {
                    // 401 错误 清理用户信息
                    const memberStroe=useMemberStore()
                    memberStroe.clearProfile()
                    uni.navigateTo({url:"/pages/login/login"})
                    reject(res)
                }else{
                    uni.showToast({
                        title:(res.data as Data<T>).msg,
                        icon: 'none',
                        mask: true
                    })
                    reject(res)
                }
            },
            fail(err){
                uni.showToast({
                    icon:"none",
                    title:"网络错误，请稍后重试"
                })
            }
        })
    })
}