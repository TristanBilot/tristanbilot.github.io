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

/* Medium's feed ends every excerpt with "Continue reading on <publication> »". */
function stripFeedBoilerplate(text) {
   return text.replace(/\s*Continue reading on .*$/s, '').trim()
}
/* "2024-02-02 09:31:07" -> "Feb 2024". Falls back to the raw date on failure. */
function formatDate(pubDate) {
   const parsed = new Date(String(pubDate).replace(' ', 'T'))
   if (isNaN(parsed)) return shortenText(pubDate, 0, 10)
   return parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function formatHTMLFromPost(item) {
   // Not every Medium post opens with an image, so this match can come back null.
   const match = String(item['description']).match(/<img[^>]+src="([^">]+)"/)
   const img = match ? match[1] : null

   const figure = img
      ? `<div class="article-card__figure"><img src="${img}" alt="" loading="lazy"></div>`
      : ''

   // Strip the boilerplate before truncating, or a cut-off copy of it survives.
   const body = stripFeedBoilerplate(toText(item.content))
   const excerpt = shortenText(body, 60, 300).trim()
   const ellipsis = excerpt.length < body.length ? '…' : ''

   return `
   <li class="article-item">
      <a class="article-link" href="${item.link}" target="_blank" rel="noopener noreferrer">
         <div class="article-card animatable fadeInUp">
            <div class="article-card__body">
               <span class="article-card__date">${formatDate(item.pubDate)}</span>
               <h4 class="article-card__title">${item.title}</h4>
               <p class="article-card__excerpt">${excerpt}${ellipsis}</p>
            </div>
            ${figure}
         </div>
      </a>
   </li>
   `;
}