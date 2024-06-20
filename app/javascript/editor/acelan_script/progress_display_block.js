class ProgressDisplayBlock{
    constructor({data}) {
        this.data = data
    }
    render(){
        const progressDisplayBlock = document.createElement('label')
        progressDisplayBlock.innerText = this.data?.progress
        return progressDisplayBlock;
    }
    save(blockContent){
        return {
            progress: blockContent.innerText
        }
    }
}
export {ProgressDisplayBlock}