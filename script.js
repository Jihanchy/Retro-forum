const loadAllPosts = async(category) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category?`?category=${category}`:'' }`)
    const data =await response.json()
    displayAllPost(data.posts)
}

const displayAllPost = (posts) => {
    const postContainer = document.getElementById("post-container")
    postContainer.innerHTML=""
    posts.forEach(post=> {
       
        const div = document.createElement('div')
        div.innerHTML=`
        <div class="flex w-full justify-center p-6 lg:p-12 gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl">
                       <div class="indicator">
                        <span class="indicator-item badge ${post.isActive? "bg-green-600" : "bg-red-500"}"></span>
                        <div class="avatar">
                            <div class="w-24 rounded-xl">
                                <img src=${post.image} alt="">
                            </div>
                        </div>
                       </div>
                       <div class="space-y-4 w-full">
                        <div class="flex gap-4 *:opacity-60">
                            <p>${post.category}</p>
                            <p>Author : ${post.author.name}</p>
                        </div>
                        <h3 class="text-2xl opacity-70 font-bold">${post.title}</h3>
                        <p class="opacity-40">${post.description}</p>
                        <hr class="border border-dashed border-gray-300">
                        <div class="flex justify-between *:font-bold [&>*:not(:last-child)]:opacity-45">
                            <div class="flex gap-4">
                                <div class="flex space-x-2 items-center">
                                    <i class="fa-regular fa-comment-dots"></i>
                                    <p>${post.comment_count}</p>
                                </div>
                                <div class="flex space-x-2 items-center">
                                    <i class="fa-regular fa-eye"></i>
                                    <p>${post.view_count}</p>
                                </div>
                                <div class="flex space-x-2  items-center">
                                    <i class="fa-regular fa-clock"></i>
                                    <p>${post.posted_time}</p>
                                </div>
                            </div>
                            <div class="opacity-100">
                                <button id="addToList" onclick="markAsRead('${post.description}','${post.view_count}')"  class="addToList btn btn-circle bg-green-500 btn-sm">
                                    <i class="fa-solid fa-envelope-open text-white"></i>
                                </button>
                            </div>
                        </div>
                       </div>
                     </div>
        `
        postContainer.appendChild(div)
    });
}

const markAsRead = (description,view_count) => {
    const markAsReadContainer = document.getElementById("markAsReadContainer")
    const div= document.createElement('div')
    div.innerHTML=`
    <div class="flex justify-between p-3 lg:p-4 bg-white rounded-2xl items-center gap-3">
       <div class="lg:w-4/5 w-11/12">
            <p>${description}</p>
        </div>
       <div class="lg:w-1/5 w-4/12 flex justify-end">
           <p><i class="fa-regular fa-eye"></i>${view_count}</p>
       </div>
    </div>
    `
    markAsReadContainer.appendChild(div)
    
    const counter=document.getElementById('markAsReadCounter').innerText;
    const convert = parseInt(counter)
    const sum = convert + 1
    document.getElementById('markAsReadCounter').innerText=sum
    
}
const handleSearchByCategory = () => {
    const searchText = document.getElementById('searchPosts').value;
    loadAllPosts(searchText)
}
loadAllPosts()