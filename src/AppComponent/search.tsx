import { Input } from "@/components/ui/input"
import { SearchProps } from "@/types/types"

const Search: React.FC<SearchProps> = ({ query, onSearch }) => {
 return(
    <div>
       <Input placeholder="search..." className="w-72" value={query} onChange={(e) => onSearch(e.target.value)} />
    </div>
 )
}

export default Search