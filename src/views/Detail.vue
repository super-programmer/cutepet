<template>
  <article>
    <van-nav-bar :title="navTitle">
      <template #left>
        <van-icon name="arrow-left" @click="goBack"/>
      </template>
    </van-nav-bar>
    <article class="m-bd">
      <section class="m-detail">
        <h3 class="m-detail__tit">{{detail.title}}</h3>
        <h5 class="m-detail__subtit">{{detail.subTitle}}</h5>
        <img :src="detail.cover" alt="">
        <section class="m-detail__con" v-html="detail.content"></section>
      </section>
    </article>
  </article>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      navTitle: '宠宠物',
      detail: {
        cover: require('../assets/images/demo/mmi.jpg'),
        title: '首发| 瑞派宠物获得玛氏C轮战略投资，投后估值达70亿元',
        subTitle: '12月5日，亿欧获悉瑞派宠物获得玛氏宠物护理的战略投资，完成C轮融资之后，瑞派宠物估值达到70亿元，是目前宠物诊疗行业估值最高的企业之一。',
        content: '<div id="post_main" class="post_main" style="height: auto;"><p>12月5日，亿欧获悉瑞派宠物获得玛氏宠物护理的战略投资，完成C轮融资之后，瑞派宠物估值达到70亿元，是目前宠物诊疗行业估值最高的企业之一。未来瑞派宠物将继续扩大宠物医疗连锁的规模与覆盖，重点打造宠物全生命周期管理体系。</p>\n' +
          '        <p>公开资料显示，瑞派宠物医院此前于<a href="https://www.iyiou.com/p/45723.html" target="_blank">2017年5月获得高盛、瑞普生物等2.4亿元的战略投资</a>；2018年5月获得华泰新产业基金、美国高盛集团、天津瑞济生物的3.5亿元战略投资，此番C轮融资过后，瑞派宠物的累计融资金额达23亿元人民币。</p>\n' +
          '        <p style="text-align:center"><img src="https://imgcache.iyiou.com/Editor/image/20191205/1575532791768940.jpeg" title="瑞派宠物连锁医院融资信息" alt="瑞派宠物连锁医院融资信息" width="" height="" border="0" vspace="0"></p>\n' +
          '        <p>获得玛氏宠物护理投资之后，瑞派将继续立足中国市场，对接玛氏资源，继续在三个方向上发力：首先，继续扩大宠物医疗连锁的规模与覆盖；其次，继续提升医疗和服务水平，更高水平的医疗技术、更适合宠物宠主就诊的医院环境，瑞派将通过软硬件投入来实现；第三，瑞派将重点打造宠物全生命周期管理体系，对于宠物是提高其获得健康关怀的效率，对于宠主是获得科学养宠的各项服务。</p>\n' +
          '        <p>玛氏方面表示看好中国宠物产业的潜力与机会。早在2017年，玛氏收购了北美连锁宠物医院龙头VCA。此外，玛氏认为瑞派是优质的经营平台，瑞派的单店营收是行业平均的1.7倍，拥有全中国规模最大、坪效最高的民营宠物医院。</p>\n' +
          '        <p>瑞派宠物全国连锁成立于2012年12月，总部位于天津，创始人为李守军，聚焦于宠物医疗、美容及宠物食品、用品销售等业务范围。</p>\n' +
          '        <p>相比于瑞鹏股份采用品牌直营的方式，瑞派宠物全国连锁采用区域管理的方式，拥有华东、北京、东北、华南、天津等11大区域管理公司，管理公司下管门店。自2015年多次接受上市公司瑞普生物增资之后，瑞派宠物全国连锁便开始大规模地收购各地的宠物医院。截止2019年12月，瑞派宠物在全国27个省拥有近300家医院，全年接诊超过200万例。</p>\n' +
          '        <p>目前，瑞派拥有员工近4000人，其中包含博士、硕士130余人，兽医专业人员1600余人，完善的人才培养体系成就了瑞派的专业化医疗水平。</p>\n' +
          '        <p>《2019年中国宠物行业白皮书》显示，2018年11月到2019年8月期间，仅仅宠物医疗行业，市场规模就达到了465.5亿，占整个宠物行业规模比例为23%。宠物医疗成为继宠物食品之后我国宠物行业的第二大细分市场，未来还有很大的发展空间。</p>\n' +
          '        <p>获得玛氏的C轮战略投资之后，瑞派宠物所具备的整合全产业链的能力将进一步得到释放。</p>\n' +
          '        <p>通过开展宠物疾病诊疗、防治、宠物保健、宠物美容等全产业链业务，与上游宠物用品生产企业的合作，可实现规模效应，并形成统一经营和规范化的管理模式，加速提升品牌效应。</p>\n' +
          '        <p>据瑞派宠物创始人李守军介绍，“未来五年国际顶级产业投资将重构中国宠物诊疗行业，国内外金融、专业经理人和经验的介入将推动产业的升级。”随着行业规范化发展，不符合规定的小型宠物医院将被淘汰，宠物医院连锁经营将成为我国宠物医疗行业主要发展趋势。</p>\n' +
          '        <p>未来，瑞派宠物医院以宠物健康为使命，围绕宠物全生命周期，将产品服务延展到宠主全消费旅程，抓住行业消费趋势，帮助宠主科学养宠，通过病例管理、体检、预防医学、治疗保健等产品服务组合，为宠物提供全生命周期健康管理。</p>\n' +
          '        <p>瑞派总裁颜伟强介绍说：“本次融资是瑞派重要的里程碑，未来中国宠物护理市场将呈现指数级增长。瑞派将以宠物医疗为核心业务，打造医疗技术与管理的核心竞争力。通过收购、自建等模式继续扩大规模，预计未来五年店面规模将超过1000家。”</p>\n' +
          '        <p class="content_cauthor">本文来源于亿欧，原创文章，作者：曹玥。转载或合作请点击<i style="color: #1d9dd1;" onclick="showReprintedLayer();">转载说明</i>，违规转载法律必究。</p><p class="financingState"><i>融资声明</i></p><p class="financingInfo" style="color:#999">注：文章中所涉投融资额度来源于企业或相关机构或公开资料，亿欧已经尽量核实，不对融资额度做品牌背书；欢迎各方监督核实，如融资额度不实，欢迎向亿欧举报。</p></div>'
      }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
