import Chat from '../components/chat.js';
import { renderItems } from './view.js';

export default function Detail(person) {
  const items = [person];
  const renderPerson = renderItems(items);

  let detailHTML = `
    <div class="content-container">
      <!-- <div class="person-left">${renderPerson}</div> !-->
      <dl class="scientist-card person-left" itemscope itemtype="WomenInTech">
        <div style="display:flex">
        <img class="personImg" itemprop="image" src="${person.imageUrl}" alt="${person.name}">
        </div>
        <dt></dt><b><dd itemprop="name">${person.name}</dd></b>
        <dt></dt><dd itemprop="shortDescription">${person.description}</dd>
      </dl>
      ${Chat()}
    </div>
  `;

  return detailHTML;
}
