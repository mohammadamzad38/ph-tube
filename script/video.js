// Creat catagories

const loadcatagories = () => {
    
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displaycatagories(data.categories))
    .catch((error)=> console.log(error));
}

const loadVideos = (searchText= "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const removeCategaroclass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for(let btn of buttons){
        btn.classList.remove("active")
    }
}
const loadCatagoriesVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayVideos(data.category)
    })
    .catch((error) => console.log(error))
};

const loadDetails = async(videoId) => {
    const uri= `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res= await fetch(uri);
    const data = await res.json();
    displaydetails(data.video);
}

const displaydetails = (video) =>{
    const detailsContainer = document.getElementById('modal-content');
    
    detailsContainer.innerHTML =`
    <img src="${video.thumbnail}"/>
    <p>${video.description}</p>
    `
    document.getElementById('customModal').showModal();
}

// const cardDemo = {
//     "category_id": "1003",
//     "video_id": "aaak",
//     "thumbnail": "https://i.ibb.co/ZNggzdm/cake.jpg",
//     "title": "Beyond The Pale",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/MZ2vbXR/jimm.jpg",
//             "profile_name": "Jim Gaffigan",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "2.6K",
//         "posted_date": "15400"
//     },
//     "description": "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
// }

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";
    if (videos.length === 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML =
        `
           <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center"><img src="./asset/Icon.png" >
           <h2 class="text-center text-xl font-bold">No Cotent in Drowing Category</h2>
           </div>
        `
        return;
    }
    else{
        videoContainer.classList.add('grid')
    }
    videos.forEach((videos) => {
        console.log(videos)

        const card = document.createElement('div');
        card.classList = 'card card-compact'
        card.innerHTML =
        `
          <figure class="h-[200px] relative">
          <img
      src=${videos.thumbnail} class="h-full w-full object-cover"
      alt="Shoes" />
      ${
        videos.others.posted_date?.length === 0 ? "" : `<span class="absolute right-2 bottom-2 text-xs bg-black text-white rounded p-1">${getTimesTring(videos.others.posted_date)}</span>`
      }
      </figure>
      <div class="px-0 py-2 flex gap-2 ">
         <div>
            <img class="w-10 h-10 rounded-full object-cover" src="${videos.authors[0].profile_picture}"/>
         </div>
         <div>
            <h2 class="font-bold">${videos.title}</h2>
            <div class="flex items-center gap-2">
               <p class="text-gray-400 ">${videos.authors[0].profile_name}</p>
               ${videos.authors[0].verified === true ? `<img src="https://img.icons8.com/?size=20&id=63760&format=png&color=000000" alt="">` : ''}
            </div>
            <p><button onclick="loadDetails('${videos.video_id}')" class="btn btn-sm btn-error">Details</button></p>
         </div>
      </div>
        `;
        videoContainer.append(card);
    });
}

function getTimesTring (time){
    const hour = parseInt(time / 3600);
    let remainsecond = time % 3600;
    const minute = parseInt(remainsecond / 60);
    remainsecond = remainsecond % 60;
    return `${hour} hrs ${minute} min ${remainsecond} sec ago`
}


// category
// : 
// "Music"
// category_id
// : 
// "1001"
// load Display Catagories

const displaycatagories = (categories) => {

    const catagoriesContainer = document.getElementById('categories');

    categories.forEach((item) => {
        console.log(item);

        const buttonContainer = document.createElement("div"); 
        buttonContainer.innerHTML =
        `
        <button id="btn-${item.category_id}" onclick="loadCatagoriesVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `;

        // add button to catagory
        catagoriesContainer.append(buttonContainer); 
        });
}

document.getElementById('search-input').addEventListener("keyup",(e) => {
    loadVideos(e.target.value);
})

loadcatagories();
loadVideos();

