import { NutritionSummaryCard } from "./foodGraphs"
import { WeightCardTitle } from "./weightCardTitle";


export function Weight(){
    return(
        <>
            <WeightCardTitle/>
            <div className="grid grid-cols-2 gap-5">
                <NutritionSummaryCard/>
            </div>
        </>
    )
}