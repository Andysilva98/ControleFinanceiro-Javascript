
addEventListener('click', (e) => {
    let el = e.target
    console.log(el.classList)
    if (el.classList == 'modal') {        

        let nav = document.getElementById('nav')
        nav.classList.toggle('active')   // toggle cria uma classe no elemento caso ela não exista, caso exista ele remove
      
    } 
    
})





