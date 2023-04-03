import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = "https://iujbfqjzhlvhvgmhtirj.supabase.co"
const supabseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1amJmcWp6aGx2aHZnbWh0aXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1Mzk5MjksImV4cCI6MTk5NjExNTkyOX0.tPY7ueHWHgU9GoPuShRc4evIoyK9P6XXN0BEIeYNzYI"
const hyperlinkbox = document.querySelector('#hyperlink-box')
const supabase = createClient(supabaseUrl, supabseKey)

const container = document.getElementById("yourmom")

async function getData() {
  const { data, error } = await supabase
    .from('hyperlinks')
    .select()

  console.log(data)

  data.forEach(item => {
    const items = document.createElement("li")
    items.textContent = item.name
    container.appendChild(items)
  })
}
getData()







/*
async function addHyperlink(name, url) {
const { data, error } = await supabase.from('hyperlinks').insert({ name, url })
if (error) {
console.log(error)
return
}
renderHyperlinks()
}
*/
/*
const editButton = document.createElement('button')
editButton.textContent = 'Edit'
editButton.addEventListener('click', () => {
const editModal = document.querySelector('#edit-modal')
const editNameInput = document.querySelector('#edit-name')
const editUrlInput = document.querySelector('#edit-url')
const currentLinkId = editButton.parentNode.getAttribute('data-link-id')
editNameInput.value = editButton.parentNode.querySelector('a').textContent
editUrlInput.value = editButton.parentNode.querySelector('a').getAttribute('href')
const saveChangesButton = editModal.querySelector('#save-changes')
saveChangesButton.addEventListener('click', async () => {
const updatedName = editNameInput.value
const updatedUrl = editUrlInput.value
const { data, error } = await supabase
.from('hyperlinks')
.update({ name: updatedName, url: updatedUrl })
.eq('id', currentLinkId)
if (error) {
console.log(error)
return
}
renderHyperlinks()
$('#edit-modal').modal('hide')
})
$('#edit-modal').modal('show')
})

const addLinkButton = document.querySelector('#add-link')
addLinkButton.addEventListener('click', async () => {
const addNameInput = document.querySelector('#add-name')
const addUrlInput = document.querySelector('#add-url')
const name = addNameInput.value
const url = addUrlInput.value
await addHyperlink(name, url)
$('#add-modal').modal('hide')
})
*/

