const nbPostsPerSlide = computeNumberOfPostsPerSlide()
const mediumURL = "https://medium.com/feed/@TristanBilot"
var posts = []
var selectedIndex = 1

$(function($) {
   fetch(`https://api.rss2json.com/v1/api.json?rss_url=${mediumURL}`)
      .then((res) => res.json())
      .then((data) => {
         const res = data.items 
         posts = res.filter(item => item.categories.length > 0)

         /* last posts */
         let output = ''
         const lastPosts = getPostsSliceFromIndex(posts, 0, nbPostsPerSlide)
         lastPosts.forEach((item) => {
            output += formatHTMLFromPost(item)
         })
         document.querySelector('.blog__slider').innerHTML = output

         /* blog counters */
         for (var i = 1; i <= (posts.length / nbPostsPerSlide) + (posts.length % nbPostsPerSlide == 0 ? 0 : 1); i++) {
            const itemClass = i == 1 ? "blog__counterItem blog__counterItem-active" : "blog__counterItem"
            $('.blog__counter').append(`<li class="${itemClass}" value="${i}"></li>`)
         }

         /* on counter click */
         $('.blog__counterItem').click(function() {
            /* indexes start at 1 in jQuery, so sad :( */
            const index = $(this).attr('value')
            if (selectedIndex == index)
               return 
            selectedIndex = index
            $(".blog__slider").fadeOut(function() {
               const newPosts = getPostsSliceFromIndex(posts, index - 1, nbPostsPerSlide)
               output = ''
               newPosts.forEach((item) => {
                  output += formatHTMLFromPost(item)
               })
               $(this).html(output).fadeIn()
            })
            $('.blog__counterItem').each(function() {
               $(this).removeClass('blog__counterItem-active')
            })
            // console.log($(`.blog__counterItem:nth-child(${index})`))
            $(`.blog__counterItem:nth-child(${index})`).addClass('blog__counterItem-active')
         })
   })
})

function computeNumberOfPostsPerSlide() {
   return isMobile() ? 2 : 4
 }

function isMobile() {
   return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
       window.screen.width < 760)
}

function toText(node) {
   let tag = document.createElement('div')
   tag.innerHTML = node
   node = tag.innerText
   return node
}
function shortenText(text,startingPoint ,maxLength) {
   return text.length > maxLength?
   text.slice(startingPoint, maxLength):
   text
}
function getPostsSliceFromIndex(posts, index, nbPostsPerSlide) {
   return posts.slice(index * nbPostsPerSlide, (index + 1) * nbPostsPerSlide)
}
function formatHTMLFromPost(item) {
   const img = (item['description']).toString().match(/<img[^>]+src="([^">]+)"/)[1];

   return `
   <a class="article-link" href="${item.link}">
      <div class="publication-card animatable fadeInUp d-flex">
         <div class="text-section" style="flex: 1;">
            <h6>${shortenText(item.pubDate, 0, 10)}</h6>
            <h5>${item.title}</h5>
            <p>${shortenText(toText(item.content), 60, 300) + '...'}</p>
         </div>
         <div class="image-section d-flex align-items-center justify-content-center" style="flex: 1;">
            <img class="publication-card__image small-img" src="${img}" alt="Article image">
         </div>
      </div>
      <hr/>
   </a>
   `;
}