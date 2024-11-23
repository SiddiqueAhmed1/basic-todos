const type = (type) => {
    switch (type) {
        case 'Pending':
            return {color : 'black', background : 'yellow'}
            
        case 'Completed':
            return {color : 'white', background : 'green'}
            
        case 'Deleted':
            return {color : 'white', background : 'maroon'}
            
    
        default:
            return {color : 'black', background : 'yellow'}
    }

}
 
export default type;