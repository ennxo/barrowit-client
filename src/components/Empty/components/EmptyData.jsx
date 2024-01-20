import { BeatLoader } from "react-spinners"

export const EmptyData = ({array, message, hasPending}) => {
    return array?.length <= 0 && (
        <div className="flex flex-col justify-center items-center h-full py-20"> 
        {hasPending ? (
          <BeatLoader color="#16a34a" />
        ):
        (
          <>
            <img src="/images/empty_data.svg" alt="empty data" className="h-40"/>
            <p className="text-gray-400 text-xl">{message}</p> 
          </>
        )
        }
        </div>
      )
}