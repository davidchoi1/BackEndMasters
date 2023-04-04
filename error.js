setTimeout(() => {
    throw new Error('oops errorjs error')
}, 300);

process.on('uncaughtException', () => {

})

process.on('unhandledRejection', () => {
    
})