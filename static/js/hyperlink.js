//imports create client
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
//waiting for the page to load to run the function
window.addEventListener('load', function () {

//defines url and key then creates supabase object 
  const supabaseUrl = "https://iujbfqjzhlvhvgmhtirj.supabase.co"
  const supabseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1amJmcWp6aGx2aHZnbWh0aXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1Mzk5MjksImV4cCI6MTk5NjExNTkyOX0.tPY7ueHWHgU9GoPuShRc4evIoyK9P6XXN0BEIeYNzYI"
  const supabase = createClient(supabaseUrl, supabseKey)

//gets reference from html
  const container = document.getElementById("yourmom")

//functinon to get the data provided from supabse
  async function getData() {
    const { data, error } = await supabase
      .from('hyperlinks')
      .select('*')

    console.log(data, error)

//iterates over the data array 
    data.forEach(item => {
  
//creates link from the url in table then adds to container
      const link = document.createElement("a")
      link.href = item.url
      link.textContent = item.name
      container.appendChild(link)

//creates a remove button with event listener to remove the links from the table
      const removeButton = document.createElement("button")
      removeButton.textContent = "Remove"
      removeButton.addEventListener("click", async () => {
        const { data: removedData, error: removedError } = await supabase
          .from('hyperlinks')
          .delete()
          .eq('id', item.id)
        if (removedData) {
          container.removeChild(link)
          container.removeChild(removeButton)
        }
      })
      container.appendChild(removeButton)
    })
  
  }
  getData()

})
