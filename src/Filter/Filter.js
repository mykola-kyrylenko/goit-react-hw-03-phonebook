import s from './Filter.module.css'

const Filter = ({ filter, onChange })=>{
    return (
        <div className={s.fragment}>
            <label htmlFor="">
                <input
                    type="text"
                    className={s.Contact__finder}
                    name="filter"
                    placeholder="Search"
                    value={filter}
                    onChange={({ target })=>onChange(target.value)}/>
            </label>
        </div>
    );
}

export default Filter;