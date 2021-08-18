import React from 'react'

export default function Clickable() {
	return [
		{
			regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.|\))/gim, // This is for link starting with 'http' or 'https'.
			fn: (key, result) => (
				<span key={key}><a target="_blank" rel="noopener noreferrer" className="link"
								   href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>{" "}{result[2]}.{result[3]}{result[4]}</a>{""}{result[5]}</span>
			),
		},
		{
			regex: /(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.|\))/gim, // This is for any word that ends in .com or .something, and starts with anything. Meaning it will turn it into a link.
			fn: (key, result) => (
				<span key={key}><a target="_blank" rel="noopener noreferrer" className="link"
								   href={`http://${result[1]}.${result[2]}${result[3]}`}>{" "}{result[1]}.{result[2]}{result[3]}</a>{""}{result[4]}</span>
			),
		},
	]
}
