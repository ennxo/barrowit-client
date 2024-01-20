export const Pages = () => {
  return (
    <>
    <div className="bg-green-600 text-white">
        <div className="flex flex-col justify-center text-center items-center mx-auto max-w-7xl py-5 px-6 sm:py-5 lg:px-5">
            <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Official Facebook Pages
            </p>
        </div>
      </div>
    <div className="flex flex-col mx-auto mt-5 max-w-7xl divide-y- my-auto overflow-hidden sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      <div>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbgy171&tabs=timeline&width=500&height=625&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=1094971158332105"
          width={500}
          height={625}
          className="border border-none overflow-hidden mx-auto block"
          allowFullScreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
      <div>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSangguniangKabataan171&tabs=timeline&width=500&height=625&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=1094971158332105"
          width={500}
          height={625}
          className="border border-none overflow-hidden mx-auto block"
          allowFullScreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
    </div>
    </>
  )
}
