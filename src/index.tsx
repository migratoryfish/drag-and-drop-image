import React from 'react'
import { render } from 'react-dom'

import { useDnDSort } from './useDnDSort'
import { getRandomTrump } from './util'

type Style<T extends HTMLElement> = React.HTMLAttributes<T>['style']

const bodyStyle: Style<HTMLDivElement> = {
  height: '100vh',
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
}

const containerStyle: Style<HTMLDivElement> = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '550px',
  maxHeight: '500px',
}

const imageCardStyle: Style<HTMLDivElement> = {
  cursor: 'grab',
  userSelect: 'none',
  width: '100px',
  height: '150px',
  overflow: 'hidden',
  borderRadius: '5px',
  margin: 3,
}

const imageStyle: Style<HTMLImageElement> = {
  pointerEvents: 'none',
  objectFit: 'cover',
  width: '100%',
  height: '100%',
}

/**
 * @description 並び替えしたい画像URLの配列
 */
const imageList: string[] = [
  'img/trump/' + getRandomTrump() + '.png',
  'img/trump/' + getRandomTrump() + '.png',
  'img/trump/' + getRandomTrump() + '.png',
  'img/trump/' + getRandomTrump() + '.png',
  'img/trump/' + getRandomTrump() + '.png',
]

/**
 * @description ドラッグ＆ドロップ並び替えサンプルのコンポーネント
 */
const SortSampleApp = () => {
  const results = useDnDSort(imageList)

  return (
    <div style={bodyStyle}>
      <div style={containerStyle}>
        {results.map((item) => (
          <div key={item.key} style={imageCardStyle} {...item.events}>
            <img src={item.value} alt="ソート可能な画像" style={imageStyle} />
          </div>
        ))}
      </div>
    </div>
  )
}

let rootElement = document.getElementById('root')

// rootElementが無ければ作成してdocument.bodyに追加する
if (!rootElement) {
  rootElement = document.createElement('div')
  rootElement.id = 'root'
  document.body.appendChild(rootElement)
}

// 全ての画像を先読みする
const prefetch = async () => {
  const promisess = imageList.map((path) => {
    return new Promise((resolve) => {
      const image = new Image()

      image.onload = resolve

      image.src = path
    })
  })

  await Promise.all(promisess)
}

// 画像が全てロードされたらコンポーネントを表示するようにする
// 本来は要らないと思うが、codesandboxの画像のロードが遅いため使用する
prefetch()
  .then(() => {
    // SortSampleAppコンポーネントを表示する
    render(<SortSampleApp />, rootElement)
  })
  .catch(() => {
    render(<p>エラーが発生しました</p>, rootElement)
  })
