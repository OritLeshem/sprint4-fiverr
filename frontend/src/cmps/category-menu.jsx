import { Link } from 'react-router-dom'

export function CategoryMenu() {

    return <section className="categories-menu full">
        <nav>
            <ul className="categories">
                <li><Link onClick={() => console.log('filterByGraphic') }>Graphic & Design</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic') }>Digital Marketing</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic') }>Writing & Translation</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic') }>Video & Animation</Link></li>
                <li> <Link onClick={() => console.log('filterByGraphic') }>Music & Audio</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic') }>Programming & Tech</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic') }>Business</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic') }>Lifestyle</Link></li>
                <li><Link onClick={() => console.log('filterByGraphic') }>Trending</Link></li>
            </ul>
        </nav>

    </section>
}