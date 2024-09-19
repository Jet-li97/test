import type { BannerItem } from "@/types/home";
import { http } from "@/utils/http";
/**
 * 首页-广告区域
 * @param distributionSite 广告区域展示位置 （1为首页，2为分类商品页）
 * @returns
 */
export const getHomeBannerAPI=(distributionSite=1)=>{
    return http<BannerItem[]>({
        method:"GET",
        url:"/home/banner",
        data:{
            distributionSite
        }
    })

}