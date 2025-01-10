/**
 * Главный компонент приложения для управления списком новостей.
 * @returns JSX.Element
 */
import { FC, useEffect, useState, useCallback, memo } from "react";
import "./App.scss";
import { Button, Space, Typography } from "antd";
import { News } from "@typesProject";
import NewsList from "@components/NewsList";
import NewsFormModal from "@components/NewsFormModal.tsx";

const { Title } = Typography;

const App: FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  /**
   * Загружает список новостей из localStorage при монтировании компонента.
   */
  useEffect(() => {
    const savedNews = localStorage.getItem("newsList");
    if (savedNews) {
      setNewsList(JSON.parse(savedNews));
    }
  }, []);

  /**
   * Сохраняет список новостей в localStorage.
   * @param news Список новостей для сохранения.
   */
  const saveNewsToLocalStorage = useCallback((news: News[]) => {
    localStorage.setItem("newsList", JSON.stringify(news));
  }, []);

  /**
   * Добавляет новую новость или обновляет существующую.
   * @param newNews Новость для добавления или обновления.
   */
  const handleAddNews = useCallback(
    (newNews: News) => {
      let updatedNewsList;

      if (editingNews) {
        updatedNewsList = newsList.map((news) => {
          if (news.id === editingNews.id) {
            return { ...news, ...newNews };
          }
          return news;
        });
      } else {
        updatedNewsList = [newNews, ...newsList];
      }

      setNewsList(updatedNewsList);
      saveNewsToLocalStorage(updatedNewsList);
      resetModalState();
    },
    [editingNews, newsList, saveNewsToLocalStorage],
  );

  /**
   * Удаляет новость из списка.
   * @param id Идентификатор удаляемой новости.
   */
  const handleDeleteNews = useCallback(
    (id: string) => {
      const updatedNewsList = newsList.filter((news) => news.id !== id);
      setNewsList(updatedNewsList);
      saveNewsToLocalStorage(updatedNewsList);
    },
    [newsList, saveNewsToLocalStorage],
  );

  /**
   * Открывает модальное окно для редактирования выбранной новости.
   * @param id Идентификатор редактируемой новости.
   */
  const handleEditNews = useCallback(
    (id: string) => {
      const newsToEdit = newsList.find((news) => news.id === id);
      if (newsToEdit) {
        setEditingNews(newsToEdit);
        setIsModalOpen(true);
      }
    },
    [newsList],
  );

  /**
   * Сбрасывает состояние модального окна и редактируемой новости.
   */
  const resetModalState = useCallback(() => {
    setIsModalOpen(false);
    setEditingNews(null);
  }, []);

  return (
    <div className="app">
      <div className="app__header app__header--sticky">
        <Title level={2} className="app__title">
          Список новостей
        </Title>

        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setEditingNews(null);
          }}
          className="app__button app__button--add-news"
        >
          Добавить новость
        </Button>
      </div>

      <Space direction="vertical" size="large" className="app__news-list">
        <NewsList
          newsList={newsList}
          onDelete={handleDeleteNews}
          onEdit={handleEditNews}
        />
      </Space>

      <NewsFormModal
        isOpen={isModalOpen}
        onClose={resetModalState}
        onAddNews={handleAddNews}
        editingNews={editingNews}
      />
    </div>
  );
};

export default memo(App);
