import { Swipe, SwipeItem, Button } from "vant";

let plugins = [
    Swipe, SwipeItem, Button
]

export default function usePlugins(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}