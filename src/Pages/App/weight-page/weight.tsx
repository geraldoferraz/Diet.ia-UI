import { WeightCard } from "./weightCard";
import { WeightCardTitle } from "./weightCardTitle";


export function Weight(){
    return(
        <>  
            <WeightCardTitle/>
            <div className="grid grid-cols-5 gap-5">
                <WeightCard/>
                <WeightCard/>
                <WeightCard/>
                <WeightCard/>
                <WeightCard/>
                <WeightCard/>
                <WeightCard/>
                <WeightCard/>
                <WeightCard/>
                <WeightCard/>
            </div>
        </>
    )
}