import { Spinner } from "./ui/spinner"

function Loading() {
    return (
        <div className="flex min-h-dvh items-center justify-center">
            <Spinner />
        </div>
    )
}

export default Loading
