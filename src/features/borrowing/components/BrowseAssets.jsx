import { AssetLists } from "./AssetLists"
import { CategoryFilters } from "./CategoryFilters"

export const BrowseAssets = () => {
    return ( 
        <div className="pt-14 min-h-full">
        <CategoryFilters/>
        <AssetLists/>
        </div>
     )
}