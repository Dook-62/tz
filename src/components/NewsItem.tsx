/**
 * Компонент отображения отдельной новости.
 * @param {News} news - Данные о новости.
 * @param {Function} onDelete - Функция для удаления новости.
 * @param {Function} onEdit - Функция для редактирования новости.
 * @returns JSX.Element
 */
import { Button, Card } from "antd";
import { FC, memo, useCallback } from "react";
import { News } from "@typesProject";

interface NewsItemProps {
  news: News;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const NewsItem: FC<NewsItemProps> = memo(({ news, onDelete, onEdit }) => {
  const handleDelete = useCallback(() => {
    onDelete(news.id);
  }, [news.id, onDelete]);

  const handleEdit = useCallback(() => {
    onEdit(news.id);
  }, [news.id, onEdit]);

  return (
    <Card
      className="news-item"
      title={news.title}
      extra={<small>{new Date(news.createdAt).toLocaleString()}</small>}
      style={{ marginBottom: "20px" }}
    >
      <img
        src={news.imageUrl}
        alt={news.title}
        style={{ width: "100%", height: "auto", marginBottom: "10px" }}
      />
      <p>{news.content}</p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button type="primary" onClick={handleEdit}>
          Изменить
        </Button>
        <Button type="default" danger onClick={handleDelete}>
          Удалить
        </Button>
      </div>
    </Card>
  );
});

export default NewsItem;
