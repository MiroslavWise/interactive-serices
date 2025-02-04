import { IResponse } from "@/services/request/types"
import { useEffect, useRef, useState } from "react"

const WORKER_PATH = "/workers/apiWorker.js"

function useWorker<R = any>() {
  const [data, setData] = useState<IResponse<R> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const workerRef = useRef(new Worker(WORKER_PATH))

  useEffect(() => {
    setLoading(true)
    workerRef.current.onmessage = (e: any) => {
      setLoading(false)
      if (e.data.status === "success") {
        setData(e.data.data)
      } else {
        setError(e.data.error)
      }
    }

    return () => {
      workerRef.current?.terminate()
    }
  }, [WORKER_PATH])

  const postMessage = (message: WorkerMessage) => {
    workerRef.current?.postMessage(message)
  }

  return { data, error, postMessage, loading }
}

export default useWorker
