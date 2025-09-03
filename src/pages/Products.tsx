const mockProducts = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" },
]

function Products() {
    return (
        <div>
            <ul>
                {mockProducts.map(p => (
                    <li key={p.id}>{p.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Products
