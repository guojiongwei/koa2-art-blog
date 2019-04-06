const router = require('koa-router')()
const ObjectId = require('mongodb').ObjectId
const db = require('./../middleware/mongodb/index.js')
router.get('/', async (ctx, next) => {
  console.log('----------------获取博客列表 client_demo_api/blog/list-----------------------');
    let { type = '', pageindex = 1, pagesize = 5} = ctx.query;
    console.log(type)
    try {
      if(type) {
        let blogList = await db.find('blogs', {type, isVisible: true, source: 1}, { html: 0, markdown: 0 });
        await ctx.render('index', {
          blogList: blogList,
          blogTypes: [ 
            { name: '全部' },
            { name: 'HTML' },
            { name: 'CSS' },
            { name: 'JavaScript' },
            { name: 'Vue' },
            { name: 'Webpack' },
            { name: 'Node' },
            { name: 'MongoDB' },
            { name: '算法' },
            { name: '工具' },
            { name: '黑科技' }
          ]
        })
      } else {
        let blogList = await db.find('blogs', {}, { html: 0, markdown: 0 });
        await ctx.render('index', {
          blogList: blogList,
          blogTypes: [ 
            { name: '全部' },
            { name: 'HTML' },
            { name: 'CSS' },
            { name: 'JavaScript' },
            { name: 'Vue' },
            { name: 'Webpack' },
            { name: 'Node' },
            { name: 'MongoDB' },
            { name: '算法' },
            { name: '工具' },
            { name: '黑科技' }
          ]
        })
      }
    }catch (e){
      await ctx.render('index', {
        blogList: [],
        blogTypes: [ 
          { name: '全部' },
          { name: 'HTML' },
          { name: 'CSS' },
          { name: 'JavaScript' },
          { name: 'Vue' },
          { name: 'Webpack' },
          { name: 'Node' },
          { name: 'MongoDB' },
          { name: '算法' },
          { name: '工具' },
          { name: '黑科技' }
        ]
      })
    }
})
router.get('/article/:id', async (ctx) => {
  try {
      let blogInfo = await db.find('blogs', {_id: ObjectId(ctx.url.slice(9)), isVisible: true, source: 1}, {});
      await ctx.render('article', { blogInfo: blogInfo[0] })
  }catch (e){
    await ctx.render('article', {
      blogInfo: {}
    })
  }
})
module.exports = router
