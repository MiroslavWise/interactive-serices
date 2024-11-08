function PageVideo() {
  return (
    <div className="fixed inset-0 p-4 flex items-center justify-center z-50">
      <section
        className="relative"
        style={{
          width: 640,
          height: 360,
        }}
      >
        <video controls width="640" height="360">
          <source
            src="https://sheira.ru/api/v1/files/4082e029708536569be1a03ceaeb5da7f7106304593fa8f60f0577de2a824436.m4v"
            type="video/mp4"
          />
        </video>
      </section>
    </div>
  )
}

PageVideo.displayName = "PageVideo"
export default PageVideo
