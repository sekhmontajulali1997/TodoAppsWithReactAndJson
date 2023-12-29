

export const getDataStatus = (type) =>{
switch (type) {
    case 'Pending':
        
        return 'yellow';

    case 'Complated':
        
        return 'green';
    case 'Deleted':
        
        return 'red';

   
}
}