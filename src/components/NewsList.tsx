/**
 * Компонент отображения списка новостей.
 * @param {News[]} newsList - Массив новостей для отображения.
 * @param {Function} onDelete - Функция для удаления новости.
 * @param {Function} onEdit - Функция для редактирования новости.
 * @returns JSX.Element
 */
import { FC, memo } from "react";
import { News } from "@typesProject";
import NewsItem from "@components/NewsItem.tsx";

interface NewsListProps {
  newsList: News[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const NewsList: FC<NewsListProps> = memo(({ newsList, onDelete, onEdit }) => {
  if (newsList.length === 0) {
    return (
      <p style={{ textAlign: "center", fontSize: "16px", color: "#555" }}>
        Список новостей пуст. Добавьте новости!
      </p>
    );
  }

  return (
    <div className="news-list">
      {newsList.map((news) => (
        <NewsItem
          key={news.id}
          news={news}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
});

export default NewsList;
